import tkinter as tk
from tkinter import ttk
import tkinter.messagebox as tm
import MySQLdb
import os

class Ping(tk.Tk):
   
   def __init__(self, *args, **kwargs):
      tk.Tk.__init__(self, *args, **kwargs)
      
      tk.Tk.wm_title(self, "Ping")

      container = tk.Frame(self)
      container.pack(side="top", fill="both", expand=True)
      container.grid_rowconfigure(0, weight=1)
      container.grid_columnconfigure(0, weight=1)

      self.frames = {}

      for F in (MainPage, ConfigDBPage, Login):
         frame = F(container, self)
         self.frames[F] = frame
         frame.grid(row=0, column=0, sticky="nsew")

      self.show_frame(Login)

   def show_frame(self, cont):
      frame = self.frames[cont]
      frame.tkraise()

      menubar = frame.menubar(self)
      self.configure(menu=menubar)

   def Login_onClick(param, param2):
      print(param + " " + param2)

   def quit():
      self.destroy()

   def openSelection(evt):
      value   = str((Lb1.get(ACTIVE)))
      winhost = Toplevel(root)
      winhost.title(value)
      lbl1    = Label(winhost, text="IP Address")
      lbl2    = Label(winhost, text="MAC Address")
      lbl3    = Label(winhost, text="Hostname")
      lbl4    = Label(winhost, text="Operating System")

      ent1    = Entry(winhost)
      ent2    = Entry(winhost)
      ent3    = Entry(winhost)
      ent4    = Entry(winhost)

      lbl1.grid(row=0, sticky=E)
      lbl2.grid(row=1, sticky=E)
      lbl3.grid(row=2, sticky=E)
      lbl4.grid(row=3, sticky=E)

      ent1.insert(0, "")
      ent2.insert(0, "")
      ent3.insert(0, value)
      ent4.insert(0, "")

      ent1.grid(row=0, column=1)
      ent2.grid(row=1, column=1)
      ent3.grid(row=2, column=1)
      ent4.grid(row=3, column=1)

class MainPage(tk.Frame):

   def __init__(self, parent, controller):
      tk.Frame.__init__(self, parent)
      #label = tk.Label(self, text="Start Page")
      #label.pack(pady=10, padx=10)
     
      toolbar = tk.Frame(self)
      toolbar.pack(side=tk.TOP, fill=tk.X)

      button1 = ttk.Button(toolbar, text="Scan", command=quit)
      button1.pack(side=tk.LEFT, padx=5, pady=2)

      #status bar
      status = tk.Label(self, text="status...", bd=1, relief=tk.SUNKEN, anchor=tk.W)
      status.pack(side=tk.BOTTOM, fill=tk.X)

      #body
      Sb1 = tk.Scrollbar(self)
      Sb1.pack(side=tk.RIGHT, fill=tk.Y)

      Lb1 = tk.Listbox(self, yscrollcommand=Sb1.set)
      Lb1.pack(expand=1,fill=tk.BOTH)

      #db = MySQLdb.connect("localhost", "root", "", "db_netops")
      #cursor = db.cursor()

      #sql = "SELECT * FROM `workstation` order by hostname"
      #try:
      #   cursor.execute(sql)
      #   results = cursor.fetchall()
      #   for row in results:
      #      hostid = row[0]
      #      hostname = row[1]
      #      hostip = row[2]
      #      hostmac = row[3]
      #      Lb1.insert(row[0], hostname)
         
      #except:
      #   print ("Error: unable to fecth data")

      #db.close()

      Sb1.config(command=Lb1.yview)

   def menubar(self, root):
      menubar  = tk.Menu(self)
      filemenu = tk.Menu(menubar, tearoff=0)
      filemenu.add_command(label="Scan...", command=quit)
      filemenu.add_separator()
      filemenu.add_command(label="Configure database...", command=lambda: controller.show_frame(ConfigDBPage))
      filemenu.add_command(label="Exit", command=quit)
      menubar.add_cascade(label="File", menu=filemenu)

      editmenu = tk.Menu(menubar, tearoff=0)
      editmenu.add_command(label="Login", command=quit)
      editmenu.add_separator()
      menubar.add_cascade(label="Edit", menu=editmenu)

      return menubar

class Login(tk.Frame):

   def __init__(self, parent, controller):
      tk.Frame.__init__(self, parent)
      label_1  = tk.Label(self, text="Username")
      label_2  = tk.Label(self, text="Password")
      entry_1  = tk.Entry(self)
      entry_2  = tk.Entry(self, show="*")
      
      loginbtn = ttk.Button(self, text="Login",command=lambda: controller.show_frame(MainPage))
                           #command=lambda: Login_onClick(entry_1.get(), entry_2.get())
      
      label_1.grid(row=0, sticky="E")
      label_2.grid(row=1, sticky="E")
      entry_1.grid(row=0, column=1)
      entry_2.grid(row=1, column=1)
      loginbtn.grid(columnspan=2)

class ConfigDBPage(tk.Frame):

   def __init__(self, parent, controller):
      tk.Frame.__init__(self, parent)
      lbl1  = tk.Label(self, text="MySQL Directory")
      lbl2  = tk.Label(self, text="Username")
      lbl3  = tk.Label(self, text="Password")
      ent1  = tk.Entry(self)
      ent2  = tk.Entry(self)
      ent3  = tk.Entry(self)
      btn1  = tk.Button(self, text="Save")
      btn2  = tk.Button(self, text="Test connection")

      lbl1.grid(row=0, sticky=tk.E)
      lbl2.grid(row=1, sticky=tk.E)
      lbl3.grid(row=2, sticky=tk.E)

      btn1.grid(row=3)
      btn2.grid(row=3, column=1)

      ent1.insert(0, "C:\\xampp\\mysql\\bin\\")
      ent2.insert(0, "root")
      ent1.grid(row=0, column=1)
      ent2.grid(row=1, column=1)
      ent3.grid(row=2, column=1)
       
app = Ping()
app.mainloop()
