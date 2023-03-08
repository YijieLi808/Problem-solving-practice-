import csv
from datetime import datetime

def converter():
    # read the CSV file into memory
    with open(r'C:\Users\qo690\Desktop\CMCity.csv', 'r') as f:
        reader = csv.reader(f)

        header = next(reader)
        
        rows = [row for row in reader]

    ocolumn = ['CmLegend','Block','CmId','CmAgency','Response_Date']

    ncolumn = ['Type','BlockAddress','CMID','CMAgency','Date']

    expected_column_order=[''] 

    if header == expected_column_order :
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
        new_rows.append(new_row)
    for row in new_rows:
        row[5]=datetime.strftime(datetime.strptime(row[5],'%Y-%m-%d %H:%M:%S'), '%Y-%m-%dT%H:%M:%S.%f')
    # write out the updated CSV file
    with open(r'C:\Users\qo690\Desktop\CMCity.csv', 'w', newline='') as f:
        writer = csv.writer(f)
        # write the header row
        writer.writerow(new_header)
        # write the remaining rows
        writer.writerows(new_rows)

