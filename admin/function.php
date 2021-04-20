<?php
 
if (isset($_POST['ekleme'])){
    $kelime = $_POST["kelime"];
    $fotoYolu = $_FILES['foto']["tmp_name"];
    $name = $_FILES['foto']["name"];
    $index =  strpos($name,".");
    $yol = substr($name, $index);

    $durum =  move_uploaded_file($fotoYolu, "../resim/".$kelime.$yol);
    echo $durum;
    $current_data = file_get_contents('aslan.json');
    $array_data = json_decode($current_data, true);
    $extra = array(  
        'kelime'      =>    ucwords($_POST['kelime']),
        'isim'      =>     $_POST["isim"],
        'sifat'      =>     $_POST["sifat"],
        'zarf'      =>     $_POST["zarf"],
        'fiil'      =>     $_POST["fiil"],
        'okunus'      =>     $_POST["okunus"],
        'resimYol'    =>     $kelime.$yol,
        'btnSmile'    =>     'false',
        'btnAngry'    =>     'true',
        'btnThink'    =>     'false',
        'knowNumber'    =>     0

    );  
    $array_data[] = $extra;  
    $final_data = json_encode($array_data,JSON_UNESCAPED_UNICODE);
    file_put_contents('aslan.json', $final_data);
    if($durum){
        echo "Kayıt Başarılı Yönlendiriliyorsunuz";
        header("Refresh: 2; url=http://ezber.epizy.com/admin/");
    }else{
        echo "Bir Hata oluştu Yönlediriliyorsunuz";
        header("Refresh: 2; url=http://ezber.epizy.com/admin/");
    }
}


//Ezberlenen kelimlerin durumu 1. button gülen yü$id = $_POST["id"];
if (isset($_POST['btnSmile'])){
    $id = $_POST["id"];
    $current_data = file_get_contents('aslan.json');
    $array_data = json_decode($current_data, true);
    $array_data[$id]['btnSmile'] = 'true';
    $array_data[$id]['btnThink'] = 'false';
    $array_data[$id]['btnAngry'] = 'false';
    $final_data = json_encode($array_data,JSON_UNESCAPED_UNICODE);
    file_put_contents('aslan.json', $final_data);
}

//Ezberlenecek kelimlerin durumu btnthin favupdate
if (isset($_POST['btnThink'])){
    $id = $_POST["id"];
    $current_data = file_get_contents('aslan.json');
    $array_data = json_decode($current_data, true);
    $array_data[$id]['btnThink'] = 'true';
    $array_data[$id]['btnSmile'] = 'false';
    $array_data[$id]['btnAngry'] = 'false';
    $final_data = json_encode($array_data,JSON_UNESCAPED_UNICODE);
    file_put_contents('aslan.json', $final_data);
}

//Ezberlemeyi bekleyen kelimeler dontlike (3.seçenek)
if (isset($_POST['btnAngry'])){
    $id = $_POST["id"];
    $current_data = file_get_contents('aslan.json');
    $array_data = json_decode($current_data, true);
    $array_data[$id]['btnAngry'] = 'true';
    $array_data[$id]['btnThink'] = 'false';
    $array_data[$id]['btnSmile'] = 'false';
    $final_data = json_encode($array_data,JSON_UNESCAPED_UNICODE);
    file_put_contents('aslan.json', $final_data);
}







//Oyunun kodları: Kelimenin doğru bilinme sayısını arttırma
if (isset($_POST['knowNumberincrease'])){
    $id = $_POST["id"];
    $current_data = file_get_contents('aslan.json');
    $array_data = json_decode($current_data, true);
    $yazdir = ++$array_data[$id]['knowNumber'];
    $array_data[$id]['knowNumber'] = $yazdir;

    $final_data = json_encode($array_data,JSON_UNESCAPED_UNICODE);
    file_put_contents('aslan.json', $final_data);
}

//Oyunun kodları: Kelimenin doğru bilinme sayısını azatma
if (isset($_POST['knowNumberdecrease'])){
    $id = $_POST["id"];
    $current_data = file_get_contents('aslan.json');
    $array_data = json_decode($current_data, true);
    $yazdir = --$array_data[$id]['knowNumber'];
    $array_data[$id]['knowNumber'] = $yazdir;
    $final_data = json_encode($array_data,JSON_UNESCAPED_UNICODE);
    file_put_contents('aslan.json', $final_data);
}




//Oyundaki yeni en yüksek skoru kaydetme
if (isset($_POST['NewhighScore'])){
    echo $_POST["score"];
    echo  "Sergen Aslan";
    $current_data = file_get_contents('highScore.json');
    $array_data = json_decode($current_data, true);
    $array_data[0]['highScore'] = $_POST["score"];
    $final_data = json_encode($array_data,JSON_UNESCAPED_UNICODE);
    file_put_contents('highScore.json', $final_data);
}

//oyunu sıfırlayan kodlar
if (isset($_POST['gameReset'])){
    $current_data = file_get_contents('aslan.json');
    $array_data = json_decode($current_data, true);
    $dataLentght = count($array_data);
    for($x = 0; $x < $dataLentght ; $x++){
        $array_data[$x]['knowNumber'] = 0;
    }
    $final_data = json_encode($array_data,JSON_UNESCAPED_UNICODE);
    file_put_contents('aslan.json', $final_data);

}


/* [{"kelime":"Column","isim":"sütun, kolon","sifat":"","zarf":"","fiil":"","resimYol":"column.jpg","knowNumber":2},{"kelime":"Community","isim":"Topluluk","sifat":"","zarf":"","fiil":"","resimYol":"community.jpg","knowNumber":2},{"kelime":"Thoughts","isim":"düşünce, fikir, düşünme","sifat":"","zarf":"","fiil":"","resimYol":"Thoughts.jpg","knowNumber":2},{"kelime":"Upgrade","isim":"","sifat":"","zarf":"","fiil":"yükseltmek","resimYol":"upgrade.jpg","knowNumber":2},{"kelime":"Equal","isim":"denk","sifat":"Eşit, aynı, denk","zarf":"","fiil":"","resimYol":"equal.jpg","knowNumber":2},{"kelime":"Undo","isim":"","sifat":"","zarf":"","fiil":"geri alma","resimYol":"undo.jpg","knowNumber":0},{"kelime":"Clothes","isim":"giysi, elbise, çamaşır","sifat":"","zarf":"","fiil":"","resimYol":"clothes.jpg","knowNumber":1},{"kelime":"Grow","isim":"","sifat":"","zarf":"","fiil":"yetişmeki büyümek","resimYol":"grow.jpg","knowNumber":0}] */
?>