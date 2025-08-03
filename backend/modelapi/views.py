import os
import pickle
import numpy as np
import xgboost as xgb
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *



def load_xgb_model(path):
    if path.endswith('.pkl'):
        with open(path, 'rb') as f:
            return pickle.load(f)
    elif path.endswith('.json'):
        model = xgb.Booster()
        model.load_model(path)
        return model
    else:
        raise ValueError("Unsupported model file format")



class PredictView(APIView):
    def post(self, request):
        try:
            # Step 1: Parse and show input
            input_data = request.data
            user_df = pd.DataFrame([input_data])
            print("Received input data:", user_df)

            # Step 2: Load meta-model (.pkl file)
            model_obj = ExampleModel.objects.filter(active=True).first()
            if not model_obj:
                return Response({'error': 'No active meta-model found'}, status=status.HTTP_404_NOT_FOUND)

            meta_model_path = model_obj.value.path
            if not meta_model_path.endswith(".pkl"):
                return Response({'error': 'Meta model must be a .pkl file'}, status=status.HTTP_400_BAD_REQUEST)

            if os.path.getsize(meta_model_path) == 0:
                return Response({'error': f'Meta model file {meta_model_path} is empty.'}, status=status.HTTP_400_BAD_REQUEST)

            with open(meta_model_path, 'rb') as f:
                meta_model = pickle.load(f)

            # Step 3: Load 3 base XGBoost models (.json format)
            thresholds = [0.15, 0.3, 0.9]
            base_model_objs = BaseModel.objects.filter(active=True).order_by('id')[:3]

            if base_model_objs.count() < 3:
                return Response({'error': 'Not enough active base models found'}, status=status.HTTP_404_NOT_FOUND)

            xgb_models = []
            for obj in base_model_objs:
                model_path = obj.value.path
                print(f"Loading base model from: {model_path} (size: {os.path.getsize(model_path)})")
                if not model_path.endswith(".json"):
                    return Response({'error': f'Base model {model_path} must be a .json file'}, status=status.HTTP_400_BAD_REQUEST)

                if os.path.getsize(model_path) == 0:
                    return Response({'error': f'Base model file {model_path} is empty.'}, status=status.HTTP_400_BAD_REQUEST)

                model = xgb.Booster()
                model.load_model(model_path)
                xgb_models.append(model)

            # Step 4: Predict using base models → build meta features
            duser = xgb.DMatrix(user_df)
            meta_features = [
                int(model.predict(duser)[0] > threshold)
                for model, threshold in zip(xgb_models, thresholds)
            ]

            # Step 5: Predict using meta-model
            meta_input = np.array(meta_features).reshape(1, -1)
            prob = float(meta_model.predict_proba(meta_input)[0][1])
            # Multiply by 100 and floor or truncate decimals
            prob_int = int(prob * 100)


            return Response({
                'probability': prob,
                'prediction': prob_int
            })

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({'error': f'Prediction failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


