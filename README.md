# nlp-similar-words

An HTTP api client that will supply similar words for given ?w= get query with natural language processing, using wordnet-db. Also does spell correction using type-js.

# using

Install npm dependencies;

~~~
npm install
~~~

Run index.js by;

~~~
npm start
~~~

OR

~~~
node index.js
~~~

Use api with the get variable of 'w';

~~~
http://localhost:8080/?w=phone
~~~

Will give an output of;

~~~
["call","telephone","call_up","phone","ring","earphone","earpiece","headphone","speech_sound","sound","telephone_set"]
~~~


# uses

- natural
- wordnet-db
- type-js
