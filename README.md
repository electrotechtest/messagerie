# messagerie
serveur de la messagerie 

#Id de requête allant de 0 à 7:
#id 0: 
permet d'ajouter des utilisateurs
http requête (json):
{
  "id":0,
  "login":/*identifiant */,
  "password":/*mot de passe*/,
  "name":/*nom de l'utilisateur*/
 }
 returne l'utilisateur complet avec son tag
 #id 1:
 permet de ce connecter 
 http requête (json):
 {
   "id":1,
  "login":/*identifiant */,
  "password":/*mot de passe*/
}
returne l'utilisateur
#id 2:
permet de crée des salon
http requête(Json):
{
  "id":2,
  "login":/*identifiant */,
  "password":/*mot de passe*/,
  
