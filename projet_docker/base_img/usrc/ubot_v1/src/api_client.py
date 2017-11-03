#!/usr/bin/env python
# -*- coding: utf-8 -*-
import requests
from tools import Change

class CoinMarketCap:
   
    def tick(top):

        try :
            
            url = """https://api.coinmarketcap.com/v1/ticker/?limit=%s"""%top
            rep = requests.get(url)
            tick = rep.json()

            tick = Change.NoneInListItems(tick, "NULL")
            tick = Change.charInListSingleItem(tick, "id", "-", "_")
            tick = Change.charInListItems(tick, "'", "")

            return tick
        
        except requests.exceptions.ConnectionError:

            return - 1
            
        
    def glob():

        try :
            
            url = "https://api.coinmarketcap.com/v1/global/"
            rep = requests.get(url)
            glob = rep.json()

            return glob
        
        except requests.exceptions.ConnectionError:
            
            return -1
        


        
        
