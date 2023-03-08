from sodapy import Socrata
import csv
from converter import converter

def main():

    converter()

    username = 'username'

    password = 'password'
    
    API_Token = 'API_Token' 

    identifier = 'identifier' #This is a four-by-four code can be found in the URL

    target = 'data.honolulu.gov'

    file_source = r'CMCity.csv' #Specify the file directory 

    client = Socrata(target, API_Token, username=username, password=password, timeout=5000) #Establish the connection

    with open(file_source,'r') as f:
        reader = csv.reader(f)
        header = next(reader)
        rows = list(reader)                                                                         

        data = []
    
        for row in rows:
            d={}
            for i in range(len(header)):
                d[header[i]]=row[i]
            data.append(d)
	
    result = client.upsert(identifier, data) #Replacing the old data

    client.close() #Ending the session

    print(result)

if __name__ == "__main__":
    main()
    print('Done.')
    print('Press ENTER to exit...')
input()
