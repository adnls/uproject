import db

db_users = db.MyDb()

login = input("login : ")
pwd = input("password : ")
email = input("email : ")
tel = input("tel : ")

db_users.use("root", "123azerty")

sql = """INSERT INTO users (login, password, tel, email)
            VALUES ("%s", "%s", "%s", "%s")"""%(login, pwd, tel, email)

db_users.post(sql)
db_users.save()
db_users.close()


