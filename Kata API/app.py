from flask import Flask, render_template, request, url_for, flash, redirect,jsonify
import pandas as pd 
from data import get_data
import json
import requests
import pprint


app = Flask(__name__)
app.config['SECRET_KEY'] = 'abcdefgh'





@app.route('/')
def index():

    owm_url = "https://samples.openweathermap.org/data/2.5/forecast?lat=0&lon=0&appid=xxx"
    reponse = requests.get(owm_url)
    contenu = json.loads(reponse.content.decode("utf-8"))

    tempe=[]
    date=[]
    tempMin=[]
    tempMax=[]

    for temp in contenu['list']:
        tempe.append(temp['main']['temp']- 273.15)
        tempMin.append(temp['main']['temp_min']- 273.15)
        tempMax.append(temp['main']['temp_max']- 273.15)

    for dt in contenu['list']:
        date.append(dt['dt_txt'].split(' ')[0])


    data=pd.DataFrame({"Temp":tempe,"Date":date,"tempMin":tempMin,"tempMax":tempMax})
    data['Date']=pd.to_datetime(data['Date'])
    data=data.groupby('Date').agg(['mean','min','max'])
    print(data)

    error=[]
    for i in range(len(data['Temp','min'].values)):
        error.append([data['Temp','min'].values[i],data['Temp','max'].values[i]])
    

    posts=[list(data['Temp','mean'].values),list(data['Temp','min'].values),list(data['Temp','max'].values),error,list(data.index.strftime('%Y-%m-%d'))]



    return render_template('index.html',value=posts)

