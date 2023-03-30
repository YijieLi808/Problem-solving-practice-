*****Environment Setup*****

1.	Install the latest version of python
Go to http://www.python.org -> navigate to Downloads tab -> click on the download button (i.e. Python 3.11.2) -> run python.exe and make sure to add Python to Path

2.	Setup the environment
In order to upload data to a Socrata data site using API, a python package called sodapy is needed. Since we are behind a proxy server, pip installer does not work by running “pip install sodapy” in the command prompt. It throws a proxy error with a message indicating that authentication failed. If you are able to bypass the proxy server, you should just run “pip install sodapy” and “pip install requests” in the command prompt and ignore the following process.
The other way to add python package is to install from the source.

2.1 
Go to https://pypi.org/ and search socrata-py-> on the side navigation bar, click on Download files -> click and download the file under Source Distribution -> extract the downloaded file and open command prompt -> cd to the uncompressed folder -> run “python setup.py install”
Again, because of the proxy server, the dependent packages cannot be installed. What I did was open python IDLE and tried to import the socrata package by running “from socrata import Socrata”. You should get an error message that tells you what packages are missing if you do the same thing. What you need to do at this point is to install the required package by repeating the above process until you can successfully import sodapy module.


*****File Description*****
datasetbuilder.py is just the program that creates a new dataset and configuration file for dataReplace.py to run. 
It only requires to run when you attempt to create a new dataset. 
If a target dataset where you wish to populate your data onto already exist, please do not run this script again.

cnoverter.py is used to change the data format that can be accpected by the API in the csv file and is called by dataReplace.py. So, no need to run, too.

The csv file that is used to populate the data is tranfered from hpd-crimemap server.
\\hpd-crimemap\c$\export_to_city\cm_sendtoINFX.bat creates the CMCity.csv file and copies the to this server(HPD-INFX c:\Crimemap_ScorataAPI_Socrata-py) at 8:30:00 am every day thru the windows task scheduler on that server.

dataReplace.py is the only script you will be using to populate the data onto the Socrata Open Data site(data.honolulu.gov) Crime Incidents dataset(four-by-four identifier: vg88-5rn5).
