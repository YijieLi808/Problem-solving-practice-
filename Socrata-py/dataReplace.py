from socrata.authorization import Authorization
from socrata import Socrata
from converter import converter
converter()
auth = Authorization('data.honolulu.gov','jwright@honolulu.gov','yiji3@HPD')
configuration_name = "Crime Incidents data replace"
view_id = "vg88-5rn5"


socrata = Socrata(auth)
view = socrata.views.lookup(view_id)

#Change the file source if it is incorrect
with open(r'C:\Crimemap_SocrataAPI\CMCity.csv', 'rb') as my_file:
    (revision, job) = socrata.using_config(
        configuration_name,
        view
    ).csv(my_file)
    print(job)
