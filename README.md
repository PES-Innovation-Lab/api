# PES Innovation Lab (formerly Microsoft Innovation Lab)

<img src="./images/mlab_logo_black.png" alt="logo" width="100px" height="90px"><br/>

We are a student community dedicated to cultivating the spirit of research and innovation in budding engineers.<br/>

This is the main repository for the website data API hosted at - [PES Innovation Lab website data API](https://pil-api.herokuapp.com). 

Be sure to head out to our website [PES Innovation Lab website](https://pes-innovation-lab.github.io/web/) and take a look at some of the exciting projects carried out at the lab.

# Development
The current version of the website can be found here - [PES Innovation Lab Github pages](https://pes-innovation-lab.github.io/web/). 

Dynamic data is fetched from an API server running on Heroku at [PES Innovation Lab website data API](https://pil-api.herokuapp.com).

The API is written in nodeJS and uses express and the Sheets API.

API documentation is available at: [PES Innovation Lab API reference](https://pil-api.readme.io/reference)

## Setting up your development environment :

1. Clone the repository after forking.

2. Ensure you have nodeJS and npm installed.

3. Run `npm install` to fetch and install all the necessary packages

4. Replicate spreadsheet organization in your own google sheet (this is required since the private key to the actual sheet cannot be shared). The organization of the spreadsheet is covered below. Replicate the structure for only the aspect that you are working on.

5. Activate the Sheets API in your Google Cloud Platform (GCP) console and setup a service account identity.

6. Share your google sheet with the service account ID with Viewer permissions.

7. Add the following to the `.env` file:

   ```
   SHEET_ID=<insert the ID of the spreadsheet you are using>
   CLIENT_EMAIL=<email address of the service account>
   CLIENT_KEY=<PRIVATE KEY of the service account>
   PORT=<the port number you want to locally run the API>
   ```

8. Run `npm start` to run the server.

9. Access API at `http://localhost:<the port number you specified earlier in the .env file>/`

## Spreadsheet Structure and Organisation

### Spreadsheet Tabs

Each tab contains data about that particular activity / archive / event / statistic.

| TAB   | projects | members | statistics | timeline | publications | hashcode | incito | internship | roadshow |
| ----- | :------: | :-----: | :--------: | :------: | :----------: | :------: | :----: | :--------: | :------: |
| INDEX |    0     |    1    |     2      |    3     |      4       |    5     |   6    |     7      |    8     |

### Index 0 - projects

|      HEADINGS       |             year             |     title     |        short_description         |        long_description         |               keywords               |               mentors               |               interns               |    poster_url     |
| :-----------------: | :--------------------------: | :-----------: | :------------------------------: | :-----------------------------: | :----------------------------------: | :---------------------------------: | :---------------------------------: | :---------------: |
| DATA REPRESENTATION |            string            |    string     |              string              |             string              |       string (comma delimited)       |      string (comma delimited)       |      string (comma delimited)       |      string       |
|     DESCRIPTION     | Year of starting the project | Project title | Short description of the project | Long description of the project | List of keywords separated by commas | List of mentors separated by commas | List of interns separated by commas | URL of the poster |

### Index 1 - members

|      HEADINGS       |          batch           |     name     |        grad_batch        |                    branch                     |   linkedin   |     email      |       github       |        picture_url         |
| :-----------------: | :----------------------: | :----------: | :----------------------: | :-------------------------------------------: | :----------: | :------------: | :----------------: | :------------------------: |
| DATA REPRESENTATION |          string          |    string    |          string          |                    string                     | string (url) | string (email) |    string (url)    |           string           |
|     DESCRIPTION     | Student internship batch | Student name | Student graduating batch | Which branch of engineering the student is in | LinkedIn URL |    Email ID    | GitHub profile URL | URL of the display picture |

### Index 2 - statistics

|      HEADINGS       |                  years                  |              members              |                projects                 |              events               |
| :-----------------: | :-------------------------------------: | :-------------------------------: | :-------------------------------------: | :-------------------------------: |
| DATA REPRESENTATION |    string (number, single row value)    | string (number, single row value) |    string (number, single row value)    | string (number, single row value) |
|     DESCRIPTION     | Number of years the lab has been active |   Number of members the lab has   | Number of active and completed projects |    Number of events conducted     |

### Index 3 - timeline

|      HEADINGS       |      year       |  event_title  |       event_description        |
| :-----------------: | :-------------: | :-----------: | :----------------------------: |
| DATA REPRESENTATION | string (number) |    string     |             string             |
|     DESCRIPTION     |      Year       | Event heading | Short description of the event |

### Index 4 - publications

|      HEADINGS       |        title        |    short_description    |               authors               |     conference     |        link         |
| :-----------------: | :-----------------: | :---------------------: | :---------------------------------: | :----------------: | :-----------------: |
| DATA REPRESENTATION |   string (number)   |         string          |      string (comma delimited)       |       string       |    string (url)     |
|     DESCRIPTION     | Year of publication | Description of the work | List of authors separated by commas | Name of conference | Link to publication |

### Index 5 - hashcode

|      HEADINGS       | event_name |     event_date     |       year        |      sponsor_text      |     poster_link      |          image_links          |
| :-----------------: | :--------: | :----------------: | :---------------: | :--------------------: | :------------------: | :---------------------------: |
| DATA REPRESENTATION |   string   |       string       |  string (number)  |         string         |     string (url)     | string (url, comma delimited) |
|     DESCRIPTION     | Event name | Dates of the event | Year of the event | Sponsors for the event | Link to event poster | List of URLs for event images |

### Index 6 - incito

|      HEADINGS       | event_name |     event_date     |       year        |      sponsor_text      |     poster_link      |          image_links          |
| :-----------------: | :--------: | :----------------: | :---------------: | :--------------------: | :------------------: | :---------------------------: |
| DATA REPRESENTATION |   string   |       string       |  string (number)  |         string         |     string (url)     | string (url, comma delimited) |
|     DESCRIPTION     | Event name | Dates of the event | Year of the event | Sponsors for the event | Link to event poster | List of URLs for event images |

### Index 7 - internship

|      HEADINGS       | event_name |     event_date     |       year        |      sponsor_text      |     poster_link      |          image_links          |
| :-----------------: | :--------: | :----------------: | :---------------: | :--------------------: | :------------------: | :---------------------------: |
| DATA REPRESENTATION |   string   |       string       |  string (number)  |         string         |     string (url)     | string (url, comma delimited) |
|     DESCRIPTION     | Event name | Dates of the event | Year of the event | Sponsors for the event | Link to event poster | List of URLs for event images |

### Index 8 - roadshow

|      HEADINGS       | event_name |     event_date     |       year        |      sponsor_text      |     poster_link      |          image_links          |
| :-----------------: | :--------: | :----------------: | :---------------: | :--------------------: | :------------------: | :---------------------------: |
| DATA REPRESENTATION |   string   |       string       |  string (number)  |         string         |     string (url)     | string (url, comma delimited) |
|     DESCRIPTION     | Event name | Dates of the event | Year of the event | Sponsors for the event | Link to event poster | List of URLs for event images |

## Contributing

We use a rebase-oriented workflow. We do not use merge commits. This means to get your local branch up-to-date with the upstream, you would use
```
git pull --rebase upstream master
```
instead of regular `git pull`. It’s best to write your commits prefacing the file you changed, but if you don’t, you can always fix your history using `git rebase -i`. An example of a good commit would be
```
index: Fix UI layout in mobile view.
```

Contact
-----
email : pes.mlab@gmail.com <br/>
Website : https://pes-innovation-lab.github.io/web/ <br/>

----