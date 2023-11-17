<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="LMS Smartboard, the next generation of class management software">
        <link href='https://fonts.googleapis.com/css?family=Inter' rel='stylesheet'>
        <link rel="stylesheet" type="text/css" href="styles.css">
        <link rel="stylesheet" type="text/css" href="admin.css">
      
        <link rel="icon" href="favicon.ico">
        <!-- <script src="../resources/jquery-3.7.1.min.js"></script> -->
        <!-- <script src="lab6.js"></script> -->

        <title>WMS | Admin Page</title>
    </head>
    <body>
        <header id="header">
          <h1>WMS SmartBoard - Admin Panel</h1>
        </header>
        <main>
          <div id="forms">
            <section> 

              <h1>Archive</h1>
              <p>The default values are for the Web Sys section</p>
              <form action="archive.php" method="post">
                <label for="crn">CRN:</label>
                <input name="crn" value="61971">
                <br>
                <label for="year">Year (as FXX or SXX):</label>
                <input name="year" value="F23">
                <input type="submit" value="Archive">
              </form> 
              
            </section>
            <section>

              <h1>Delete</h1>
              <p>The default values are for the Web Sys section</p>
              <form action="delete.php" method="delete">
                <label for="crn">CRN:</label>
                <input name="crn" value="61971">
                <br>
                <label for="year">Year:</label>
                <input name="year" value="F23">
                <input type="submit" value="Delete Archive">
              </form>

            </section>
          </div>
          <section>
            
            <?php
              $user = 'phpmyadmin';$pass = 'p@s5w0rd';
              try {
                $db = new PDO('mysql:host=localhost;dbname=lab6',$user,$pass);
                $query = 'SELECT jsondata FROM archive WHERE crn = 61971 AND year = "F23";';
                $stmt = $db->query($query);
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($result) {
                  echo json_encode($result);
                } else {
                  echo '<br><p id="data">No Data</p>';
                }
                unset($db);
              } catch (PDOException $e) {
                echo '<p>Error: '.$e.'</p>';
              }
            ?>

          </section>

        </main>
    </body>
</html>
