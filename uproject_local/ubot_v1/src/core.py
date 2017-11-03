import datetime
import store_data
import requests
import json
from threading import RLock

lock = RLock()

class Threader():
    
    def threader(container):
        
        update = store_data.Update()
        ctn = container
        countDays = 0

        while True:

            date = datetime.datetime.now()

            if date.second == 0:

                print("\n")
                print("/////////////////////////////////////")
                print(date.strftime("%Y-%m-%d %H:%M:%S"))

                table = update.motherTables()
                print("/////////////////////////////////////")
                print("NOTE : tables mères actualisées")
                
                tables = update.tables_1min()
                print("/////////////////////////////////////")
                print("NOTE : tables à 1min actualisées")

                period = json.dumps([{"period":"1min"}])
                data = json.dumps({"tick" : tables["tick"], "period" : period})

                try:                   
                    rep = requests.post("http://localhost:5000/pool_2", data = data)                   
                    print("""NOTE : %s %s\nNOTE : table tick_1min transmise au scanner"""%(rep, rep.json()))
                except requests.exceptions.ConnectionError:
                    print("WARNING : scanner hs")
                    
                with lock:                    
                    ctn.set_tick(table)
                    ctn.set_tick_1min(tables["tick"])
                    ctn.set_glob_1min(tables["glob"])
                
                if date.minute in (0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55):

                    tables = update.otherTables(["tick_1min", "glob"], ["tick_5min", "glob_5min"], 5)
                    print("/////////////////////////////////////")
                    print("NOTE : tables à 5min actualisées")

                    period = json.dumps([{"period":"5min"}])
                    data = json.dumps({"tick" : tables["tick"], "period" : period})
                    
                    try:
                        rep = requests.post("http://localhost:5000/pool_3", data = data)
                        print("""NOTE : %s %s\nNOTE : table tick_5min transmise au scanner"""%(rep, rep.json()))
                    except requests.exceptions.ConnectionError:
                        print("WARNING : scanner hs")
                    
                    with lock:                                           
                        ctn.set_tick_5min(tables["tick"])
                        ctn.set_glob_5min(tables["glob"])
                                
                elif date.minute in (1, 16, 31, 46):

                    tables = update.otherTables(["tick_5min", "glob_5min"], ["tick_15min", "glob_15min"], 3)
                    print("/////////////////////////////////////")
                    print("NOTE : tables à 15min actualisées")

                    period = json.dumps([{"period":"15min"}])
                    data = json.dumps({"tick" : tables["tick"], "period" : period})

                    try:
                        rep = requests.post("http://localhost:5000/pool_3", data = data)
                        print("""NOTE : %s %s\nNOTE : table tick_15min transmise au scanner"""%(rep, rep.json()))
                    except requests.exceptions.ConnectionError:
                        print("WARNING : scanner hs")
                    
                    with lock:                                           
                        ctn.set_tick_15min(tables["tick"])
                        ctn.set_glob_15min(tables["glob"])            
                    
                elif date.minute in(2, 32):

                    tables = update.otherTables(["tick_15min", "glob_15min"], ["tick_30min", "glob_30min"], 2)
                    print("/////////////////////////////////////")
                    print("NOTE : tables à 30min actualisées")

                    period = json.dumps([{"period":"30min"}])
                    data = json.dumps({"tick" : tables["tick"], "period" : period})

                    try:
                        rep = requests.post("http://localhost:5000/pool_3", data = data)
                        print("""NOTE : %s %s\nNOTE : table tick_30min transmise au scanner"""%(rep, rep.json()))
                    except requests.exceptions.ConnectionError:
                        print("WARNING : scanner hs")
                    
                    with lock:                                           
                        ctn.set_tick_30min(tables["tick"])
                        ctn.set_glob_30min(tables["glob"])
                        
                elif date.minute == 3:

                    tables = update.otherTables(["tick_30min", "glob_30min"], ["tick_1h", "glob_1h"], 2)
                    print("/////////////////////////////////////")
                    print("NOTE : tables à 1h actualisées")

                    period = json.dumps([{"period":"1h"}])
                    data = json.dumps({"tick" : tables["tick"], "period" : period})

                    try:
                        rep = requests.post("http://localhost:5000/pool_3", data = data)
                        print("""NOTE : %s %s\nNOTE : table tick_1h transmise au scanner"""%(rep, rep.json()))
                    except requests.exceptions.ConnectionError:
                        print("WARNING : scanner hs")
                                
                    with lock:                                           
                        ctn.set_tick_1h(tables["tick"])
                        ctn.set_glob_1h(tables["glob"])
                        
                elif (date.hour in(0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22) and date.minute == 4):

                    tables = update.otherTables(["tick_1h", "glob_1h"], ["tick_2h", "glob_2h"], 2)
                    print("/////////////////////////////////////")
                    print("NOTE : tables à 2h actualisées")

                    period = json.dumps([{"period":"2h"}])
                    data = json.dumps({"tick" : tables["tick"], "period" : period})

                    try:
                        rep = requests.post("http://localhost:5000/pool_3", data = data)
                        print("""NOTE : %s %s\nNOTE : table tick_2h transmise au scanner"""%(rep, rep.json()))
                    except requests.exceptions.ConnectionError:
                        print("WARNING : scanner hs")
                                
                    with lock:                                           
                        ctn.set_tick_2h(tables["tick"])
                        ctn.set_glob_2h(tables["glob"])
                        
                elif date.hour in(0, 4, 8, 12, 16, 20) and date.minute == 6:

                    tables = update.otherTables(["tick_2h", "glob_2h"], ["tick_4h", "glob_4h"], 2)
                    print("/////////////////////////////////////")
                    print("NOTE : tables à 4h actualisées")

                    period = json.dumps([{"period":"4h"}])
                    data = json.dumps({"tick" : tables["tick"], "period" : period})

                    try:
                        rep = requests.post("http://localhost:5000/pool_3", data = data)
                        print("""NOTE : %s %s\nNOTE : table tick_4h transmise au scanner"""%(rep, rep.json()))
                    except requests.exceptions.ConnectionError:
                        print("WARNING : scanner hs")
                                
                    with lock:                                           
                        ctn.set_tick_4h(tables["tick"])
                        ctn.set_glob_4h(tables["glob"])
                        
                elif (date.hour == 0 and date.minute == 7):

                    tables = update.otherTables(["tick_4h", "glob_4h"], ["tick_1d", "glob_1d"], 6)
                    print("/////////////////////////////////////")
                    print("NOTE : tables à 1d actualisées")

                    period = json.dumps([{"period":"1d"}])
                    data = json.dumps({"tick" : tables["tick"], "period" : period})

                    try:
                        rep = requests.post("http://localhost:5000/pool_3", data = data)
                        print("""NOTE : %s %s\nNOTE : table tick_1d transmise au scanner"""%(rep, rep.json()))
                    except requests.exceptions.ConnectionError:
                        print("WARNING : scanner hs")
                                
                    with lock:                                           
                        ctn.set_tick_1d(tables["tick"])
                        ctn.set_glob_1d(tables["glob"])
                        
                    countDays+=1
                                
                elif ((countDays == 1 or countDays%7 == 0) and (date.minute == 8) and (date.hour == 0)):

                    tables = update.otherTables(["tick_1d", "glob_1d"], ["tick_1w", "glob_1w"], 7)
                    print("/////////////////////////////////////")
                    print("NOTE : tables à 1w actualisées")

                    period = json.dumps([{"period":"1w"}])
                    data = json.dumps({"tick" : tables["tick"], "period" : period})

                    try:
                        rep = requests.post("http://localhost:5000/pool_3", data = data)
                        print("""NOTE : %s %s\nNOTE : table tick_1w transmise au scanner"""%(rep, rep.json()))
                    except requests.exceptions.ConnectionError:
                        print("WARNING : scanner hs")
                                
                    with lock:                                           
                        ctn.set_tick_1w(tables["tick"])
                        ctn.set_glob_1w(tables["glob"])
                                    
                date2 = datetime.datetime.now() - date
                print("/////////////////////////////////////////////")
                print("""NOTE : durée des opérations %s secondes"""%(round(float("""%s.%s"""%(date2.seconds, date2.microseconds)), 2)))
                print("/////////////////////////////////////////////")
                         
