import threading
from flask import Flask, request
import json
import pandas as pd
import cherrypy
import queue
from container import Container

#/////////////////////////
#instanciation des objets ->
ctn_1 = Container()
ctn_2 = Container()
ctn_3 = Container()
ctn = [ctn_1, ctn_2, ctn_3]

#///////////////////////
# Create a queue of work
q_1 = queue.Queue()
q_2 = queue.Queue()
q_3 = queue.Queue()
qs = [q_1, q_2, q_3]

#////////////////////////
#création de la flask app->
app = Flask(__name__)       

#def de l'app ->        
@app.route('/pool_1', methods=['POST'])
def result_1():      

    data = request.get_data()
    data = json.loads(data)
    data = pd.DataFrame(data)

    ctn_1.set_ctn_data(data)   
    
    message = json.dumps("<[post_request_handled_on_pool_0]>")  
    return message 

@app.route('/pool_2', methods=['POST'])
def result_2():
        
    data = request.get_data()              
    data = json.loads(data)
    
    data_tick = json.loads(data["tick"])
    data_tick = pd.DataFrame(data_tick)

    data_period = json.loads(data["period"])

    data_ids = data_tick["id"].unique()

    for name in data_ids:
        q_2.put(name)
       
    ctn_2.set_ctn_data([data_tick, data_period])

    for i in range(10):

        t_2 = threading.Thread(target=worker, args = (1,))
        t_2.daemon = True
        t_2.start()
    
    message = json.dumps("<[post_request_handled_on_pool_1]>")

    return message 

@app.route('/pool_3', methods=['POST'])
def result_3():
    
    data = request.get_data()   
    data = json.loads(data)               

    data_tick = json.loads(data["tick"])
    data_tick = pd.DataFrame(data_tick)

    data_period = json.loads(data["period"])

    data_ids = data_tick["id"].unique()

    for name in data_ids:
        q_3.put(name)
    
    ctn_3.set_ctn_data([data_tick, data_period])
    
    for i in range(10):

        t_3 = threading.Thread(target=worker, args = (2,))
        t_3.daemon = True
        t_3.start()

    message = json.dumps("<[post_request_handled_on_pool_2]>")    

    return message 

#////////////////////
#def du worker ->
def worker(i):
    
    while True:
        
        name = qs[i].get()
        data = ctn[i].get_ctn_data()           
        print(name, data[1][0]["period"])
        qs[i].task_done()
        
    return

#//////////////////////////
if __name__ == '__main__':

    #config serveur     
    cherrypy.tree.graft(app, "/")

    cherrypy.server.unsubscribe()
    server = cherrypy._cpserver.Server()
                
    server.socket_host = "0.0.0.0"
    server.socket_port = 5000
    server.thread_pool = 30

    server.subscribe()

    #lancement du serveur
    cherrypy.engine.start()
    cherrypy.engine.block()

    
    
