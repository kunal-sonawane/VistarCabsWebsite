# Maharashtra location suggestions

`maharashtra-locations.json` was downloaded from the Government of Maharashtra Common Village Master web services on 30 October 2026.

It contains 44,929 village records, 358 talukas, 36 districts, and 406 municipal corporations/councils/nagar panchayats/cantonment boards. Gram panchayat records are excluded because they duplicate village-level coverage and would make the suggestion list substantially noisier. The website adds a small set of commonly used neighbourhood, airport, and destination labels in the form component.

The source describes its directory as updated LGD district, taluka, village and local-body data:

- [Maharashtra Common Village Master](https://mahavillages.mahabhumi.gov.in/)
- [Published LGD web-services guide](https://mahavillages.mahabhumi.gov.in/pdf/LGD%20WebServices.pdf)

The JSON is loaded lazily when a traveller focuses a location field. Suggestions match the beginning of the English or Marathi place name and show the district alongside each match. Travellers can still enter a custom pickup point if a locality name is not in this administrative dataset.

Refresh this dataset periodically from the official service. Confirm language spellings and exact destination/address details with the traveller before accepting an enquiry.
