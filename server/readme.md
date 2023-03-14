# run server
``` python3.10 app.py ```
# install packages
``` pip3 install -r requirements.txt ```
# update requirement.txt
``` pip3 freeze > requirements.txt ```
# mySQL
mysql.server start
mysql -uroot -p

# migration database
``` flask db init ``` only for first time
``` flask db migrate -m 'migration message' ```
``` flask db upgrade ```