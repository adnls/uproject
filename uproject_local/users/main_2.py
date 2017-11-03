import db

db_users = db.MyDb()
nbr = 0

def yes_or_no(question):

    print(question)
    rep = input()
        
    return rep

#////////////////////////////////////mode choice/////////////////////////////////////////    
print("here we go!\nit's time to build your own strategy!")
print("step 1!\nselect your mode in the list below:\nauto\neasy\nadvanced\nexpert")
mode = input()

print("you choose the %s mode !"%mode)

#//////////////////////////////////////currencies/////////////////////////////////////////
print("step 2!\nselect the currencies you want to follow!")
print("""you have two methods for choosing the currencies you wnat to follow : \n1) you can select a number of top currencies\n2) you can and add extra currencies\nrules are simple : 20 currencies maximum !""")

rep = yes_or_no("select x top currencies ? (Y/N)")

if rep == "Y":
    nbr = int(input("choose a number between 1 and 20 : "))
else :
    rep = 1

if nbr < 20:
    extra_curr = []
    
while nbr < 20 and rep == "Y":

    rep = yes_or_no("you choose %s currencies !\nadd another currency ? (Y/N)"%nbr)

    if rep == "Y" : 
        curr = input("name of the currency : ")
        extra_curr.append(curr)
        nbr += 1
        
#////////////modes fork/////////////////////////////////////
if mode == "auto":
    pass
elif mode == "easy":
    pass
elif mode == "advanced":
    pass

#///////////expert mode/////////////////////////////////////////////////////////////////////////////////////////////////////////////
elif mode == "expert":

    print("step 3!\nchoose your trading frequence!\nselect a time scale in the list below :\n5min\n15min\n30min\n1h\n2h\n4h\n1d\n1w")
    period = input()
    print("you choose the %s time scale!"%period)
    
#//////////expert mode main indicator///////////////////////////////////////
    
    print("step 4!\nbuild your algorythm! let's start with the buy alerts!")

    print("type the id of your algorythm main event :")

    print("1 macd zero line cross")
    print("2 macd signal cross + below zero line")
    print("3 macd signal cross")
    print("4 boll high close cross")
    print("5 boll dist becomes > mean(dist)+1*std(dist) + boll mid increasing")
    print("6 sma price cross")
    print("8 sma sma cross")
    print("7 ema price cross")
    print("9 ema ema cross")
    
    buy_main_event = int(input())

    print("now, the sell alerts!")

    print("type the id of your algorythm main event :")
    
    print("1 macd zero line cross")
    print("2 macd signal cross + above zero line")
    print("3 macd signal cross")
    print("4 boll low close cross")
    print("5 boll dist becomes > mean(dist)+1*std(dist) + boll mid decreasing")
    print("6 sma price cross")
    print("8 sma sma cross")
    print("7 ema price cross")
    print("9 ema ema cross")

    sell_main_event = int(input())

    if buy_main_event in range(1,3):
        
        print("step 5! type the id of another indicator you want to include in your algorythm :")

        print("1 bollinger cross momentum")
        print("2 bollinger cross status")
        
        print("3 bollinger dist momentum")
        print("4 bollinger dist status")

        print("5 macd zero line cross momentum")
        print("6 macd zero line cross status")

        print("7 macd signal cross momentum")
        print("8 macd signal cross status")
        
        print("9 macd signal cross cline + below/above zero line momentum")
        print("10 macd signal cross cline + below/above zero line status")
        
        print("11 sma price cross momentum")
        print("12 sma price cross status")

        print("13 sma sma cross momentum")
        print("14 sma sma cross status")

        print("15 ema price cross momentum")
        print("16 ema price cross status")

        print("17 ema ema cross momentum")
        print("18 ema ema cross status")
        
        print("19 currency market cap increasing/decreasing")
        print("20 btc pct increasing/decreasing")
        print("21 global market cap increasing/decreasing")

        print("22 popularity on google is high")
        

