import axios from "axios";

export async function getUser() {
  try {
    const response = await axios.get(
      "	https://www.mixesdb.com/db/api.php?action=query&format=json&list=recentchanges&rcnamespace=0&rcstart=&rcprop=user%7Ctimestamp%7Ctitle&rclimit=75&rctype=new&redirects="
    );
    let x = response.data.query.recentchanges;
    // console.log(x[0])
    let array = [];
    for (i = 0; i < 10; i++) {
      array.push(`https://www.mixesdb.com/w/${x[i].title}`);
    }
    console.log(array);
    return array;
  } catch (error) {
    console.error(error);
  }
}
