import threading
from flask import Flask, request
import json
import pandas as pd
import cherrypy

#/////////////////////////
#def de l'objet partagé ->
class Container:
    def __init__(self):
        self.data = object()
    def get_ctn_data(self):
        return self.data
    def set_ctn_data(self, data):
        self.data = data

#instanciation des objets ->
ctn_1 = Container()
ctn_2 = Container()
ctn_3 = Container()
ctn = [ctn_1, ctn_2, ctn_3]

#///////////////////////
#init listes de threads ->
threads_1 = []
threads_2 = []
threads_3 = []

#////////////////////////
#création de la flask app->
app = Flask(__name__)       

#def de l'app ->        
@app.route('/pool_1', methods=['POST'])
def result_1():

    message = json.dumps("<[post_request_handled_on_pool_1]>")    

    data = request.get_data()    
    ctn_1.set_ctn_data(data)   
    t_1 = threading.Thread(target=worker, args = (0,))
    threads_1.append(t_1)

    if len(threads_1)>1 : 
        del threads_1[0]

    t_1.start()
    
    return message 

@app.route('/pool_2', methods=['POST'])
def result_2():

    message = json.dumps("<[post_request_handled_on_pool_2]>")    

    data = request.get_data()    
    ctn_2.set_ctn_data(data)   
    t_2 = threading.Thread(target=worker, args = (1,))
    threads_2.append(t_2)

    if len(threads_2)>1 : 
        del threads_2[0]

    t_2.start()
    
    return message 

@app.route('/pool_3', methods=['POST'])
def result_3():

    message = json.dumps("<[post_request_handled_on_pool_3]>")    

    data = request.get_data()    
    ctn_3.set_ctn_data(data)   
    t_3 = threading.Thread(target=worker, args = (2,))
    threads_3.append(t_3)

    if len(threads_3)>1 : 
        del threads_3[0]

    t_3.start()
    
    return message 

#////////////////////
#def du worker ->
def worker(i):

    data = ctn[i].get_ctn_data()   
    data = json.loads(data)
       
    if len(data)>2:        
        data = pd.DataFrame(data)
        print("//////////tick/////////////")
        print(data.loc[data["id"] == "bitcoin"][["dateheure", "id", "cours_usd"]].tail(1))

    else:
        data_tick = json.loads(data["tick"])
        data_glob = json.loads(data["glob"])
        
        data_tick = pd.DataFrame(data_tick)
        data_glob = pd.DataFrame(data_glob)
        
        print("////////tick_x///////////")
        print(data_tick.loc[data_tick["id"] == "bitcoin"][["dateheure", "id", "close_usd"]].tail(1))
        print("////////glob_x//////////")
        print(data_glob[["dateheure", "btcpct", "totalmc", "mcvolume24h"]].tail(1))
      
    return



#//////////////////////////
if __name__ == '__main__':

    #config serveur     
    cherrypy.tree.graft(app, "/")

    cherrypy.server.unsubscribe()
    server = cherrypy._cpserver.Server()
                
    server.socket_host = "localhost"
    server.socket_port = 5000
    server.thread_pool = 30

    server.subscribe()

    #lancement du serveur
    cherrypy.engine.start()
    cherrypy.engine.block()

    
    
