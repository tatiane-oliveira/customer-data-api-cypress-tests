# Bug Report: #06

Incorrect endpoint URI

## Details

### Steps to reproduce

1. Access API documentation ([Swagger](https://bitbucket.org/thiagohcn/customer-data-api-java/src/master/swagger.yaml)).

### Expected result
The endpoint URI should be `/accounts/v1/account/{accountId}`

![AccountController class]('bg-06-account-controller.png')

### Observed result
The endpoint URI is `/accounts/v1/accounts/{accountId}`.

![Swagger]('bg-06-swagger.png')

## Priorization

### Priority
`High`

### Reason
Unable to access the endpoint.