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
