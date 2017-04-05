
/// <reference path="/Scripts/FabricUI/MessageBanner.js" />
(function(){
    Office.initialize = function (reason) {
        $(document).ready(function () {
            $("#sample_button").on('click', function () {
               
                Office.context.document.getFileAsync("compressed", function (result) {
                    var myFile = result.value;
                    myFile.getSliceAsync(0, function (result) {
                        if (result.status == "succeeded") {
                           
                            (function calltransientdoc() {

                                var fileContent = new Uint8Array(result.value.data);

                                var formData = new FormData();
                                var furl = Office.context.document.url;
                                var fname = "dummy.pptx";
                                formData.append('File-Name', fname);
                                formData.append('File', new Blob([fileContent]), fname);
                               
                                $.ajaxSetup({
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('Access-Token', '3AAABLblqZhC07zQRYGGdPL424U2SUYaBVJoidr5IbHPp_OR-UBMfgAHi9HUZwVBNeOaqc4yQiPBi0jcijQXglcXJXSe4Tmt8');
                                        xhr.setRequestHeader('x-api-user', 'email:harshi@adobe.com');
                                    },
                                
                                    complete: function (xhr, status) {
                                                    if (status === "success") {
                                                        var data = xhr.responseText;
                                                        var jsonresponse = JSON.parse(data.match(/[{].*.[}]/));
                                                        var transient_doc_id = jsonresponse.transientDocumentId;
                                                        var agreementCreationInfo = {
                                                            "documentCreationInfo": {
                                                                "fileInfos": [
                                                                    {
                                                                        "transientDocumentId": transient_doc_id
                                                                    }
                                                                ],
                                                                "recipientSetInfos": [
                                                                         {
                                                                             "recipientSetMemberInfos": [
                                                                               {
                                                                                   "email": "prashantharshi@gmail.com"
                                                                               }
                                                                             ],
                                                                             "recipientSetRole": "SIGNER"
                                                                         }
                                                                ],
                                                                "name": "test",
                                                                "signatureType": "ESIGN",
                                                                "signatureFlow": "SEQUENTIAL"
                                                            }
                                                        };
                                                        agreementCreationInfo.options = {
                                                            "authoringRequested": true,
                                                            "autoLoginUser": true,
                                                            "locale": "",
                                                            "noChrome": true,
                                                            "sendThroughWeb": true,
                                                            "sendThroughWebOptions": {
                                                                "fileUploadOptions": {
                                                                    "libraryDocument": false,
                                                                    "localFile": false,
                                                                    "webConnectors": false
                                                                }
                                                            }
                                                        };


                                                        $.ajaxSetup({
                                                            beforeSend: function (xhr) {
                                                                xhr.setRequestHeader('Access-Token', "3AAABLblqZhDJXYP89iTuWhmqGRUN9BPx_ZUv1MIyNUHQx8Gi4paubu2LDdUtJ3AMpJhGNYYqJjaL2EnVG8xa3SGicur7QQ13");
                                                            },
                                                            complete: function (xhr, status) {
                                                                if (status === "success") {
                                                                    var data = xhr.responseText;
                                                                    var jsonresponse = JSON.parse(data.match(/[{].*.[}]/));
                                                                    
                                                                    var embedded_url = jsonresponse.url;

                                                                    

                                                                    try {
                                                                        window.localStorage.setItem("url", embedded_url);
                                                                        
                                                                   
                                                                    } catch (ex) {
                                                                        console.log(ex.message);
                                                                    }  
                                                                } else {
                                                                    console.log("error");
                                                                }
                                                            }
                                                        });


                                                        $.ajax({
                                                            url: "https://api.na1.echosign.com/api/rest/v4/agreements",
                                                            method: "POST",
                                                            data: JSON.stringify(agreementCreationInfo),
                                                            contentType: "application/json",
                                                            dataType: "json"
                                                        });



                                            
                                        } else {
                                            console.log("error");
                                        }
                                    }
                                });
                                
                                $.ajax({
                                    url: "https://api.na1.echosign.com/api/rest/v4/transientDocuments",
                                    method: "POST",
                                    data: formData,
                                    dataType: "json",
                                    processData: false,
                                    contentType: false
                                });
                            })();
                         } 
                    });
                });


            });
        });
    }
})();


