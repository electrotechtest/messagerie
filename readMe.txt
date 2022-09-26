# messagerie
serveur de la messagerie 

# Id de requête allant de 0 à 7:
# id 0: 
permet d'ajouter des utilisateurs
http requête (json):
{<ln
  "id":0,
  "login":/*identifiant */,
  "password":/*mot de passe*/,
  "name":/*nom de l'utilisateur*/
 }
 returne l'utilisateur complet avec son tag
# id 1:
 permet de ce connecter 
 http requête (json):
 {
   "id":1,
  "login":/*identifiant */,
  "password":/*mot de passe*/
}
returne l'utilisateur
# id 2:
permet de crée des salon
http requête(Json):
{
  "id":2,
  "login":/*identifiant */,
  "password":/*mot de passe*/,
  "name":/*nom de la conv*/,
  "member":[{"tag":/*tag du membre*/}],// le créateur est mis automatiquement
}
returne la nouvelle conv
# id 3:
permet d'envoyer un message
http requête (json):
{ 
  "id":3,
  "login":/*identifiant */,
  "password":/*mot de passe*/,
  "tagC":y,/*tag de la conv*/
  "data":/*message*/
}
returne "ok message sent"
#id 4:
permet de charge les conv ds les quelle l'user est membre
http requête (json):
{
  "id":4,
  "login":/*identifiant */,
  "password":/*mot de passe*/
}
returne tte les conv avec le nom des membre
#id 5:
permet de charger les message d'une conv
http requête (json):
{
  "id":5,
  "login":/*identifiant */,
  "password":/*mot de passe*/,
  "tagC":/*tag de la conv*/
}
returne tt les message
#id 6:
permet de rajouter un membre a une conv
http requête (json):
{
  "id":6,
  "login":/*identifiant */,
  "password":/*mot de passe*/,
  "tagC":/*tag de la conv*/,
  "tagU":/*tag de l'utilisateur*/
}
returne "user was added"
#id 7:
permet de quitter une conv
http requête (json):
{
  "id":7,
  "login":/*identifiant */,
  "password":/*mot de passe*/,
  "tagC":/*tag de la conv*/
}