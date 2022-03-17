
# Macropad 🚧
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

TODO: Add [Schematic](), [PCB](), [CAD]() files here.


# Web Interface
`http://macropad.local/`

![](.misc/Screenshot%202022-03-17%20at%2011.51.58@2x.png)

The web interface is a Vue.js application.

TODO: Add project directory here.

# API

| **Method** | **URL** | **Description** |
| :--- | :--- | :--- |
| `GET` | `/api/config` | read config |
| `POST` | `/api/config` | write config |
| `DELETE` | `/api/config` | delete config |
| `GET` | `/api/restart` | restart |
| `GET` | `/api/reset` | earase all settings |



# Macro Script Proposal

<table>
    <thead>
        <tr>
            <th>Syntax</th>
            <th>Feature</th>
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
        </tr>
    </tbody>
</table>

(~ Interval is not implemented yet)