from flask import Flask

app = Flask(__name__)


@app.route("/")
def hello(parameter):
    return "Welcome to machine learning model APIs!"


if __name__ == '__main__':
    app.run()