import csv
import decimal
import utm

import MySQLdb
import sys
import datetime, time

from decimal import Decimal
from numpy import genfromtxt

conn = MySQLdb.connect(host= "localhost",
                  user="root",
                  passwd="eit123123",
                  db="eit_idrett")
x = conn.cursor()


def isInteger(s):
    try:
        int(s)
        return True
    except ValueError:
        return False

def isDec(s):
    try:
        return True
    except ValueError:
        return False

def select(table, where, whereis):
    q = ("SELECT id FROM %s WHERE %s='%s'")% (table,where,whereis)
    x.execute(q)
    conn.commit()
    return x

def selectkom(table, where, where2, whereis, whereis2):
    q = ("SELECT id FROM %s WHERE %s='%s' AND %s='%s'")% (table,where,whereis, where2, whereis2)
    x.execute(q)
    conn.commit()
    return x

def selectianlegg(table, where, whereis):
    q = ("SELECT id FROM %s WHERE %s='%s'")% (table,where,whereis)
    x.execute(q)
    conn.commit()
    return x

def insertidrett(table,variables,query):
    insert_stmt =("INSERT INTO %s (%s) VALUES ('%s)")% (table, variables, query)
    data = x.execute(insert_stmt)
    conn.commit()
    return data

def insert(table,variables,query):
    insert_stmt =("INSERT INTO %s (%s) VALUES ('%s')")% (table, variables, query)
    data = x.execute(insert_stmt)
    conn.commit()
    return data

def getfromcsv():
    kommuneReader = csv.reader(open('IdrettsanleggKommuner.csv', 'r' ),delimiter=';')
    fylkedict = {}
    for row in kommuneReader:
        fylke = row[1]
        if(fylkedict.has_key(fylke)):
            pass
        else:
            insert('idrettsanlegg_fylke', 'name', fylke)
            fylkedict[fylke] = x.lastrowid

        kommuneValues = str(row[3]) +'\', \'' + str(fylkedict[fylke])
        insert('idrettsanlegg_kommune', 'name, fylke_id', kommuneValues)

    reader = csv.reader(open('utf8.csv', 'r' ),delimiter=';')
    kategori_id = -1
    klasse_id = -1
    status_id = -1
    type_id = -1
    fylke_id = -1
    kategoridict = {}
    klassedict = {}
    statusdict = {}
    typedict = {}
    next(reader)
    for row in reader:
        katvar = row[10]
        if katvar =="Kulturbygg":
            continue

        if katvar in kategoridict:
            kategori_id = kategoridict[katvar]
        else:
            kategori = select('idrettsanlegg_anleggskategori', 'kategori', katvar)
            if kategori.rowcount == 0:
                insert('idrettsanlegg_anleggskategori','kategori', katvar)
                kategori_id = kategori.lastrowid
                kategoridict[katvar] = kategori_id
            else:
                kategori_id = kategori.fetchone()[0]
                kategoridict[katvar] = kategori_id

        klasvar = row[9]
        if(klasvar in klassedict):
            klasse_id = klassedict[klasvar]
        else:
            klasse = select('idrettsanlegg_anleggsklasse', 'klasse', klasvar)

            if klasse.rowcount == 0:
                insert('idrettsanlegg_anleggsklasse','klasse', klasvar)
                klasse_id = klasse.lastrowid
                klassedict[klasvar] = klasse_id
            else:
                klasse_id = klasse.fetchone()[0]
                klassedict[klasvar] = klasse_id


        statvar = row[6]
        if statvar != "Eksisterende":
            continue
        if(statvar in statusdict):
            status_id = statusdict[statvar]
        else:
            status = select('idrettsanlegg_anleggstatus', 'status', statvar)

            if status.rowcount == 0:
                insert('idrettsanlegg_anleggstatus','status', statvar)
                status_id = status.lastrowid
                statusdict[statvar] = status_id
            else:
                status_id = status.fetchone()[0]
                statusdict[statvar] = status_id

        typvar = row[11]
        if typvar in typedict:
            type_id = typedict[typvar]
        else:
            type = select('idrettsanlegg_anleggstype', 'type', typvar)

            if type.rowcount == 0:
                insert('idrettsanlegg_anleggstype','type', typvar)
                type_id = type.lastrowid
                typedict[typvar] = type_id
            else:
                type_id = type.fetchone()[0]
                typedict[typvar] = type_id

        kartvalues = []

        ngox = row[15];
        if isInteger(ngox):
            pass
        else:
            ngox = '0'

        kartvalues.append(ngox)

        ngoy = row[16];
        if isInteger(ngoy):
            pass
        else:
            ngoy = '0'

        kartvalues.append(ngoy)

        ngoakse = row[17];
        if isInteger(ngoakse):
            pass
        else:
            ngoakse = '0'

        kartvalues.append(ngoakse)

        utmnord = row[18];
        if isInteger(utmnord):
            pass
        else:
            utmnord = '0'

        kartvalues.append(utmnord)

        utmost = row[19];
        if isInteger(utmost):
            pass
        else:
            utmost = '0'

        kartvalues.append(utmost)

        utmsone = row[20];
        if isInteger(utmsone):
            pass
        else:
            utmsone = '0'
        kartvalues.append(utmsone)

        kpunkt = row[31];
        if isInteger(kpunkt):
            pass
        else:
            kpunkt = '0'

        kartvalues.append(kpunkt)

        Latitude = row[32].replace(',','.')
        if isDec(Latitude):
            if(float(Latitude) > 58 and float(Latitude) < 80):
                pass
            else:
                if utmnord> 0 and utmost> 0 and utmsone > 0:
                    try:
                        latlong =  utm.to_latlon(utmost, utmnord, utmsone, 'W')
                        Latitude = latlong[1]

                    except ValueError:
                        Latitude = '0.00000000000000'

                else:
                    Latitude = '0.00000000000000'
        else:
            if utmnord > 0 and utmost> 0 and utmsone > 0:
                    latlong = utm.to_latlon(utmost, utmnord, utmsone, 'W')
                    Latitude = latlong[1]
            else:
                Latitude = '0.00000000000000'
        kartvalues.append(Latitude)
        if Latitude == '0.00000000000000':
            continue

        Longitude = row[33].replace(',','.')
        if isDec(Longitude):
            if(float(Longitude) > 0 and float(Longitude) < 30):
                pass
            else:
                if utmnord > 0 and utmost > 0 and utmsone > 0:
                    try:
                        latlong =  utm.to_latlon(utmost, utmnord, utmsone)
                        Longitude = latlong[1]

                    except ValueError:
                        Longitude = '0.00000000000000'

                else:
                    Longitude = '0.00000000000000'
        else:
             if utmnord > 0 and utmost > 0 and utmsone > 0:
                    latlong =  utm.to_latlon(utmost, utmnord, utmsone)
                    Longitude = latlong[2]
             else:
                Longitude = '0.00000000000000'
        kartvalues.append(Longitude)
        if Longitude == '0.00000000000000':
            continue

        fylke = select('idrettsanlegg_fylke', 'name', row[4])
        f = fylke.fetchone()
        if f:
            fylke_id = f[0]
            kommune = selectkom('idrettsanlegg_kommune', 'name', 'fylke_id', row[5], fylke_id)

            a = kommune.fetchone()
            if a:
                kommune_id = a[0]
            else:
                kommune_id = None
        else:
            kommune_id = None


        data = []

        byggeaar = row[13]
        if isInteger(byggeaar):
            pass
        else:
            byggeaar ='0'
        data.append(byggeaar)#byggeaar

        data.append(row[18])
        data.append(row[7])
        data.append(row[0])
        data.append(row[1])
        areal = row[30]

        if isInteger(areal):
            pass
        else:
            areal = '0'
        data.append(areal)#areal

        number = row[29]
        if isInteger(number):
            pass
        else:
            number = '0'

        data.append(number)#bredde

        number = row[23]
        if isInteger(number):
            pass
        else:
            number = '0'

        data.append(number)#indratt

        number = row[28]
        if isInteger(number):
            pass
        else:
            number = '0'


        data.append(number)#lengde
        data.append(row[24])
        data.append(row[25])
        data.append(row[26])
        data.append(row[27])

        number = row[2]
        if isInteger(number):
            pass
        else:
            number = '0'

        data.append(number)#nummer1
        data.append(row[14])

        number = row[21]
        if isInteger(number):
            pass
        else:
            number = '0'

        data.append(number)#tildelt

        number = row[22]
        if isInteger(number):
            pass
        else:
            number = '0'

        data.append(number)#utbetalt
        data.append(row[12])
        data.append(str(kategori_id))
        data.append(str(klasse_id))
        data.append(str(type_id))
        data.append(str(status_id))
        values = '\', \''.join(data)
        if kommune_id:
            values += '\', \'' + str(kommune_id) + '\''

        else:
            values += '\', NULL'

        print(row[0])


        insertidrett('idrettsanlegg_idrettsanlegg', 'Byggeaar, anleggDriver, anleggEier, anleggsnavn, '
                                                              'anleggsnummer, areal, bredde, inndratt, lengde, maaldata1, '
                                                                'maaldata2, maaldata3, maaldata4, nummer1, ombyggeaar, '
                                                                'tildelt, utbetalt, uu, Anleggskategori_id, Anleggsklasse_id, '
                                                                'Anleggstype_id, anleggStatus_id, kommune_id', values)

        ianlegg_id = x.lastrowid
        kartvalues.append(str(ianlegg_id))
        kartdatavalues = '\', \''.join(kartvalues)
        insert('idrettsanlegg_kartdata','ngoxkoordinat, ngoykoordinat, ngoakse, utmnord, utmost, utmsone, kpunkt, Latitude, Longitude, idrettsanlegg_id',
               kartdatavalues)
getfromcsv()


 #Anleggsnavn;Anleggsnummer;nummer1;nummer1;Fylke;
#       0       1              2       3     4
#Kommune;Status;Eier;Driver;Anleggsklasse;
#   5       6    7      8       9
#Anleggskategori;Anleggstype;uu;Byggeaar;
#   10              11       12     13
#ombyggeaar;ngoxkoordinat;ngoykoordinat;ngoakse;utmnord;
#   14          15          16              17      18
#utmost;utmsone;tildelt;utbetalt;inndratt;
#   19      20      21      22      23
#maaldata1;maaldata2;maaldata3;maaldata4;lengde;
#   24      25          26          27      28
#bredde;areal;kpunkt;Latitude;Longitude
#   29    30    31      32      33
