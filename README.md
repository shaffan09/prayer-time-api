# Prayer Time API

An API that gives prayer times for different islands of the Maldives.

## Requirements

- Node.js (v8.12.0)
- MySQL (version > 5.5.3)

## Project Setup

1. Query the `salat_mysql_dump.sql` file to your MySQL database.

2. Run the following command on your terminal to create the `.env` file. Then update the `.env` file with your credentials.

```cmd
cp .env.example .env
```

3. Run the following commands to install the packages and to start the web server.

```node
npm install
```

```node
npm run dev
```

## API Endpoints

### Islands

Use the following URL to get all the islands.

```
http://localhost:8080/islands
```

__Result:__

```json
[
  {
    "IslandId": 1,
    "Island": "ތުރާކުނު",
    "Atoll": "ހއ",
    "CategoryId": 41,
    "Minutes": 1
  },
  {
    "IslandId": 2,
    "Island": "އުލިގަމު",
    "Atoll": "ހއ",
    "CategoryId": 41,
    "Minutes": 1
  },
]
```

Pass the `search` query parameter to retrieve islands that specificaly starts with the term that has been passed.

```
http://localhost:8080/islands?search=މިލަން
```

__Result__

```json
[
  {
    "IslandId": 203,
    "Island": "މިލަންދޫ",
    "Atoll": "ށ",
    "CategoryId": 44,
    "Minutes": 0
  }
]
```

Use the following URL to get specific island by ID.

```
http://localhost:8080/islands/203
```

__Result__

```json
{
  "IslandId": 203,
  "Island": "މިލަންދޫ",
  "Atoll": "ށ",
  "CategoryId": 44,
  "Minutes": 0
}
```

Use the following to get islands either by `Atoll` or `CategoryId`.

```
http://localhost:8080/islands/atoll/ށ
```

```
http://localhost:8080/islands/atoll/44
```

__Result__

```json
[
  {
    "IslandId": 34,
    "Island": "ނޫމަރާ",
    "Atoll": "ށ",
    "CategoryId": 44,
    "Minutes": 0
  },
  {
    "IslandId": 35,
    "Island": "ކަނޑިތީމު",
    "Atoll": "ށ",
    "CategoryId": 44,
    "Minutes": 1
  },
]
```

### Prayer Times

Use the following URL to get prayer times for an island on a specific date by passing `islandID` and `date`.

>__Note:__ _When sending `date` use `YYYY-MM-DD` format._

```
http://localhost:8080/prayerTime?islandId=203&date=2003-10-6
```

__Result__

```json
{
  "Fajuru": "2003-10-06T04:42:00.000Z",
  "Sunrise": "2003-10-06T05:53:00.000Z",
  "Dhuhr": "2003-10-06T12:01:00.000Z",
  "Asr": "2003-10-06T15:13:00.000Z",
  "Maghrib": "2003-10-06T18:00:00.000Z",
  "Isha": "2003-10-06T19:11:00.000Z"
}
```

Use the following URL to get prayer times for an island for a range of days by passing `islandID`, `from`, and `to` query parameter.

>__Note:__ _When sending date (`from` and `to`) to get prayer times, send only month and date of the month. For example `October, 6th` is `10-6`._

```
http://localhost:8080/prayerTime?islandId=203&from=10-6&to=10-7
```

__Result__

```json
[
  {
    "Fajuru": "2023-10-06T04:42:00.000Z",
    "Sunrise": "2023-10-06T05:53:00.000Z",
    "Dhuhr": "2023-10-06T12:01:00.000Z",
    "Asr": "2023-10-06T15:13:00.000Z",
    "Maghrib": "2023-10-06T18:00:00.000Z",
    "Isha": "2023-10-06T19:11:00.000Z"
  },
  {
    "Fajuru": "2023-10-07T04:42:00.000Z",
    "Sunrise": "2023-10-07T05:53:00.000Z",
    "Dhuhr": "2023-10-07T12:00:00.000Z",
    "Asr": "2023-10-07T15:13:00.000Z",
    "Maghrib": "2023-10-07T17:59:00.000Z",
    "Isha": "2023-10-07T19:10:00.000Z"
  }
]
```
