from socrata.authorization import Authorization
from socrata import Socrata
from converter import converter
converter()
#create the crime incidenets dataset on data.honolulu.gov
auth = Authorization('data.honolulu.gov','jwright@honolulu.gov','yiji3@HPD')
with open(r'C:\Crimemap_ScorataAPI\CMCity.csv', 'rb') as file:
    (revision, output) = Socrata(auth).create(
        name = "Crime Incidents",
        description = ""
    ).csv(file)

    revision.apply(output_schema = output)

#create a configuration file for data replacement
config = output.build_config("Crime Incidents data replace", "replace")



