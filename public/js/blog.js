$(function() {
 
    Parse.$ = jQuery;
 
    // Replace this line with the one on your Quickstart Guide Page

    Parse.initialize("8WpXtkol8a8jBIC260IJQlmN2jSGGmpSTWWkrImq", "SZZA5mvdGsDMEcucp85vanu0QI9vqLUiH8PBGYsT");
    //javascriptKey is required only if you have it on server.
    
    Parse.serverURL = 'https://parseapi.back4app.com/'
    var Article = Parse.Object.extend("Article")
                         
    var query = new Parse.Query(Article);
     query.find().then((results) => {
        var jsonArray = [];
        for(var i = 0; i < results.length; i++) {
            jsonArray.push(results[i].toJSON());
         } 
        var template = Handlebars.compile($('#article-tpl').html());
            var html = template(jsonArray);
            $('.main-container').html(html);
    })
    .catch((error) => {
        console.log(error)
    });
});