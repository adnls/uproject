#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json

message = [{"wait_please" : "container_is_empty"}]
message = json.dumps(message)

class Container():
        
    def __init__(self):
        
        self.tick = message
        self.tick_1min = message
        self.tick_5min = message
        self.tick_15min = message
        self.tick_30min = message
        self.tick_1h = message
        self.tick_2h = message
        self.tick_4h = message
        self.tick_1d = message
        self.tick_1w = message
        
        self.glob_1min = message
        self.glob_5min = message
        self.glob_15min = message
        self.glob_30min = message
        self.glob_1h = message
        self.glob_2h = message
        self.glob_4h = message
        self.glob_1d = message
        self.glob_1w = message

    #//////////////////
    def set_tick(self, data):

        self.tick = data

    def get_tick(self):

        return self.tick


    #//////////////////
    def set_tick_1min(self, data):

        self.tick_1min = data

    def get_tick_1min(self):

        return self.tick_1min


    def set_glob_1min(self, data):

        self.glob_1min = data

    def get_glob_1min(self):

        return self.glob_1min

    
    #//////////////////
    def set_tick_5min(self, data):

        self.tick_5min = data

    def get_tick_5min(self):

        return self.tick_5min


    def set_glob_5min(self, data):

        self.glob_5min = data

    def get_glob_5min(self):

        return self.glob_5min

    #//////////////////
    def set_tick_15min(self, data):

        self.tick_15min = data

    def get_tick_15min(self):

        return self.tick_15min


    def set_glob_15min(self, data):

        self.glob_15min = data

    def get_glob_15min(self):

        return self.glob_15min

    #//////////////////
    def set_tick_30min(self, data):

        self.tick_30min = data

    def get_tick_30min(self):

        return self.tick_30min


    def set_glob_30min(self, data):

        self.glob_30min = data

    def get_glob_30min(self):

        return self.glob_30min

    #//////////////////
    def set_tick_1h(self, data):

        self.tick_1h = data

    def get_tick_1h(self):

        return self.tick_1h


    def set_glob_1h(self, data):

        self.glob_1h = data

    def get_glob_1h(self):

        return self.glob_1h

    #//////////////////
    def set_tick_2h(self, data):

        self.tick_2h = data

    def get_tick_2h(self):

        return self.tick_2h


    def set_glob_2h(self, data):

        self.glob_2h = data

    def get_glob_2h(self):

        return self.glob_2h

    #//////////////////
    def set_tick_4h(self, data):

        self.tick_4h = data

    def get_tick_4h(self):

        return self.tick_4h


    def set_glob_4h(self, data):

        self.glob_4h = data

    def get_glob_4h(self):

        return self.glob_4h

    #//////////////////
    def set_tick_1d(self, data):

        self.tick_1d = data

    def get_tick_1d(self):

        return self.tick_1d


    def set_glob_1d(self, data):

        self.glob_1d = data

    def get_glob_1d(self):

        return self.glob_1d

    #//////////////////
    def set_tick_1w(self, data):

        self.tick_1w = data

    def get_tick_1w(self):

        return self.tick_1w
    

    def set_glob_1w(self, data):

        self.glob_1w = data

    def get_glob_1w(self):

        return self.glob_1w

if __name__ == "__main__":
    
    ctn = Container()
    rep = ctn.get_tick_1h()
    print(rep)
