import csv
from datetime import datetime

def converter():
    with open(r'C:\Crimemap_SocrataAPI\CMCity.csv', 'r') as f: # read the CSV file into memory
        reader = csv.reader(f)

        header = next(reader)
    
        rows = [row for row in reader]

    ocolumn = ['CmLegend','Block','CmId','CmAgency','Response_Date'] #rename the columns

    ncolumn = ['Type','BlockAddress','CMID','CMAgency','Date']

    if header == ['ObjectID','IncidentNum','BlockAddress','CMID','CMAgency','Date','Type','Status','Score','Side']:
        return

    i = 0

    for column in ocolumn:
        header[header.index(column)] = ncolumn[i]
        i+=1

    new_order = [0,4,6,2,3,1,5,7,8,9]
    new_header = [header[i] for i in new_order]
    new_rows = []
    for row in rows:
        new_row = [row[i] for i in new_order]
        new_rows.append(new_row) #reorder the columns
    for row in new_rows:
        row[5]=datetime.strftime(datetime.strptime(row[5],'%Y-%m-%d %H:%M:%S'), '%Y-%m-%dT%H:%M:%S.%f') #change the date format to floating timestamp

    with open(r'C:\Crimemap_SocrataAPI\CMCity.csv', 'w', newline='') as f: # write out the updated CSV file
        writer = csv.writer(f) 
    
        writer.writerow(new_header) # write the header row
    
        writer.writerows(new_rows) # write the remaining rows
