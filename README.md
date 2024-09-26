# Hospital_Management_Sample


# Hospital_Management_Sample/HospitalManagementWeb

.env

```
VITE_API_URL = https://localhost:7163/api
```

Commands:

npm install 

npm run dev


# Hospital_Management_Sample/HospitalManagementAPI

appsetting.json

```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=<Server-name>;Database=HospitalManagement;Trusted_Connection=True;MultipleActiveResultSets=True;Encrypt=False;"
  },
  "Jwt": {
    "Secret": "your_jwt_secret_key",
    "Issuer": "http://localhost",
    "Audience": "http://localhost"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

commands:

Database Update: dotnet ef database update

Dotnet run: dotnet run







