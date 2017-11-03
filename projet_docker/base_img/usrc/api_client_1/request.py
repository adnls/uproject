import requests 
import pandas as pd

test = 0

try:

    rep = requests.get("http://192.168.99.100:5000/tick_1min")
    rep_2 = requests.get("http://192.168.99.100:5000/glob_1min") 
    
except requests.exceptions.ConnectionError:

    test = -1
        
if test == 0:
    
    if len(rep.json())>1:

        df = pd.DataFrame(rep.json())
        rep2 = df.loc[df['id'] == "ethereum"][["close_usd", "id", "dateheure"]].tail(5)
        rep3 = df["id"].unique()
        rep4 = df["nom"].unique()
        print(rep2)
    else:
        print(rep.json())

    if len(rep_2.json())>1:
        
        df_2 = pd.DataFrame(rep_2.json())
        print(df_2.tail(1))

    else:
        print(rep.json())

else:
    print("connectionError")
    

    
    




