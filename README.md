<h1 align="center">ML Credit Score</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/ishtiyaqe/ml-credit-score?color=56BEB8">
  <img alt="Github language count" src="https://img.shields.io/github/languages/count/ishtiyaqe/ml-credit-score?color=56BEB8">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/ishtiyaqe/ml-credit-score?color=56BEB8">
  <img alt="License" src="https://img.shields.io/github/license/ishtiyaqe/ml-credit-score?color=56BEB8">
</p>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/ishtiyaqe" target="_blank">Author</a>&#xa0; | &#xa0;
  <a href="https://drive.google.com/drive/folders/1e7q97rGTdrpBEsPasbZdhn_7hV7IuJpI?usp=sharing" target="_blank">Trained models</a>
</p>

<br>

## :dart: About ##

ML Credit Score is a machine learning-based web application that predicts a user's credit score based on input features. The project includes a Django backend that loads a pre-trained XGBoost model (.pkl) and a modern React + Tailwind CSS frontend that visualizes the score using a car-meter-style UI with smooth animations.

<h2>🧠 Model Training</h2>

<p>The credit score prediction model was built using a <strong>stacked ensemble learning approach</strong> to improve accuracy and robustness:</p>

<ul>
  <li>We trained <strong>three separate XGBoost binary classifiers</strong> on the training dataset, each with a different decision threshold (0.15, 0.3, and 0.9). These thresholds control the sensitivity of the base models, creating diverse prediction behaviors.</li>
  <li>For each base model, predictions on the training and test sets were converted to binary labels using their respective thresholds. These binary predictions served as <strong>meta features</strong>.</li>
  <li>The meta features from all base models were stacked into a new feature matrix.</li>
  <li>A <strong>logistic regression meta-model</strong> was then trained on this stacked feature matrix to optimally combine the base models’ outputs.</li>
  <li>This stacked model architecture leverages the complementary strengths of individual base classifiers, achieving better overall performance than any single model.</li>
  <li>All three base XGBoost models and the final logistic regression meta-model were saved separately for production use.</li>
  <li>During inference, raw input features are first passed through the base models to generate meta features, which are then input to the meta-model for the final prediction.</li>
</ul>

<p>This stacking approach balances precision and recall by combining diverse base model thresholds with a simple, interpretable meta-model, making it well-suited for credit scoring tasks.</p>

## :sparkles: Features ##

:heavy_check_mark: Predicts credit score using a trained ML model;\
:heavy_check_mark: Frontend visual animation with car-meter style gauge;\
:heavy_check_mark: REST API to send and receive score data;\
:heavy_check_mark: Clean UI built with Tailwind CSS;\
:heavy_check_mark: Backend built with Django & XGBoost.

## :rocket: Technologies ##

The following tools and technologies were used in this project:

- [Python 3.10+](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [XGBoost](https://xgboost.readthedocs.io/)
- [Pickle](https://docs.python.org/3/library/pickle.html)
- [React (Vite)](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js or react-spring](https://www.react-spring.dev/) (for animations)

## :white_check_mark: Requirements ##

Before starting, you need to have the following installed:

- [Git](https://git-scm.com)
- [Python 3.10+](https://www.python.org/)
- [Node.js](https://nodejs.org/)
- [Vite](https://vitejs.dev/)

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/ishtiyaqe/ml-credit-score

# Access the folder
$ cd ml-credit-score

================== BACKEND SETUP ==================

$ cd backend

# Create virtual env & activate
$ python -m venv env
$ source env/bin/activate   # On Windows use `env\Scripts\activate`

# Install dependencies
$ pip install -r requirements.txt

# Run database migrations
$ python manage.py migrate

# Create a superuser (optional)
$ python manage.py createsuperuser

# Run the server
$ python manage.py runserver

================== FRONTEND SETUP ==================

$ cd ../frontend

# Install dependencies
$ npm install

# Start the development server
$ npm run dev

# Visit http://localhost:3000 to use the app

