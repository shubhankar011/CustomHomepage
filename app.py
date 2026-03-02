from flask import Flask, render_template

app = Flask(__name__, 
            template_folder=os.path.join(os.path.dirname(__file__), 'templates'),
            static_folder=os.path.dirname(__file__),
            static_url_path=''
           )

@app.route('/')
def home_page():
    return render_template('index.html')
@app.route('/settings')
def settings_page():
    return render_template('settings.html')
if __name__ == "__main__":
    app.run(debug=True)
