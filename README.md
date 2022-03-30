
# MacroPad 🚧
```
o       o   o-O-o    o--o  
|       |     |      |   | 
o   o   o     |      O--o  
 \ / \ /      |      |     
  o   o     o-O-o    o     
```
This project is currently in development.

More details and documentation will be added soon.

# Hardware

| ![](.misc/Screenshot%202022-02-08%20at%2021.19.25@2x.png) | ![](.misc/Screenshot%202022-02-08%20at%2021.21.45@2x.png) |
| - | - | 
| ![](.misc/_G000317.jpg) | ![](.misc/_G000322.jpg) | 

### PCB

- [Exported EasyEDA Project](hardware/EasyEDA)

- [Schematic (PDF)](hardware/Schematic_MacroPad_2022-03-30.pdf)

- [Manufacturing Files (Gerber)](hardware/Gerber)

- [BOM (CSV)](hardware/BOM_MacroPad_2022-03-30.csv) The exported BOM list could be inacurate, It's recommended to import the EasyEDA project to check the BOM list.

### 3D Printing Parts

There's 2 parts you can print
- Body: The stand or case whatever you call it, shown in the picture above.
- Spacer: To align the keys while soldering. This is optional.

[3D Printing Parts (STL/AMF/FreeCAD)](hardware/3D%20Prints)

It's recommended to place 4 **Silicone Rubber Feet** with diameter of 10mm underneath the body to prevent slipping.


# Web Interface
`http://macropad.local/`

![](.misc/Screenshot%202022-03-17%20at%2011.51.58@2x.png)
![](.misc/Screenshot%202022-03-30%20at%2017.41.32@2x.png)

The web interface is a Vue.js application.

See [/web](web) for more information.

# API

| **Method** | **URL** | **Description** | **Done** |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/config` | read config | ✅ |
| `POST` | `/api/config` | write config | ✅ |
| `DELETE` | `/api/config` | delete config | ✅ |
| `GET` | `/api/restart` | restart | ✅ |
| `GET` | `/api/reset` | earase all settings | ✅ |



# Macro Script Proposal

<table>
    <thead>
        <tr>
            <th>Syntax</th>
            <th>Feature</th>
            <th>Done</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
<pre># This is a comment
@ CTRL SHIFT CMD F1
$ Hello world!
! 1200
~ 50
+ WIN R
- WIN R
.</pre>
            </td>
            <td>
<pre>comment
shortcut
string
wait (ms)
interval (ms)
press key
release key
release all keys</pre>
            </td>
            <td>
<pre>✅
✅
✅
✅
❌
✅
✅
✅</pre>
            </td>
        </tr>
    </tbody>
</table>

(~ Interval is not implemented yet)