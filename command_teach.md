## 常用指令的介紹

### 檔案的搜尋

* which

找尋執行檔的路徑

$ which [執行檔名稱] 

參數說明： 

```
#範例： 
	$ which ls                       # /bin/ls
	$ which passwd                   # /usr/bin/passwd
	$ which fdisk                    # /sbin/fdisk
```

* locate

到檔案資料庫尋找檔案，資料庫可使用 updatedb 更新。公司的人很常用，我也是不懂...

參數說明： 

```
#範例： 
	[root@wbHome test]# locate updatedb
	locate: fatal error: Could not find user database '/var/lib/slocate/slocate.db':
	No such file or directory
	[root@wbHome test]# updatedb
	/usr/bin/slocate: option requires an argument -- l
	[root@wbHome test]# locate updatedb
	/usr/share/man/man1/updatedb.1.bz2
	/usr/share/vim/ftplugin/updatedb.vim
	/usr/share/vim/syntax/updatedb.vim
	/usr/bin/updatedb
	/etc/updatedb.conf
```

* find

功能強大的檔案搜尋指令。

[root@linux ~]# find [PATH] [option] [action]

參數說明：

```
1. 與時間有關的參數：
   -atime n ：在 n 天之前的『一天之內』被 access 過的檔案；
   -ctime n ：在 n 天之前的『一天之內』被 change 過狀態的檔案；
   -mtime n ：在 n 天之前的『一天之內』被 modification 過的檔案；
   -newer file ：比檔案 file 還新的檔案。
2. 與使用者或群組名稱有關的參數：
   -uid n ：使用者的帳號 ID，UID=n 的檔案
   -gid n ：群組名稱的 ID，GID=n 的檔案
   -user name ：使用者帳號名稱為 name 的檔案
   -group name：群組名稱為 name 的檔案
   -nouser    ：檔案的擁有者不存在的檔案
   -nogroup   ：檔案的擁有群組不存在的檔案
3. 與檔案權限及名稱有關的參數：
   -name filename：檔案名稱為 filename 的檔案；
   -size [+-]SIZE：比 SIZE 還要大(+)或小(-)的檔案。SIZE 的規格有：
                   c:byte， k:1024bytes。例如：-size +50k。
   -type TYPE    ：檔案的類型為 TYPE 的檔案，類型主要有：一般正規檔案 (f),
                   裝置檔案 (b, c), 目錄 (d), 連結檔 (l), socket (s), 
                   及 FIFO (p) 等屬性。
   -perm mode  ：檔案屬性『剛好等於』 mode 的檔案
   -perm -mode ：檔案屬性『必須包含所有 mode 的屬性』的檔案，權限數值大於等於 mode。
   -perm +mode ：檔案屬性『包含任一 mode 的屬性』的檔案，
                 例如：-perm +755(-rwxr-xr-x)，包含屬性為 -rw------- 的檔案。
4. 額外可進行的動作：
   -exec command ：-exec 後再接指令 command 來處理搜尋的結果。
   -print        ：將結果列印到螢幕上（預設動作）
```

```
#範例：
	#範例一：列出 24 小時內更動過內容 (mtime) 的檔案
	[root@linux ~]# find / -mtime 0
	# find / -mtime 3 ，今天之前的 3*24 ~ 4*24 小時之間
	# -atime 與 -ctime 的用法相同。

	#範例二：尋找 /etc 下檔案日期比 /etc/passwd 新的檔案
	[root@linux ~]# find /etc -newer /etc/passwd

	#範例三：搜尋 /home 下屬於 deyu1 的檔案
	[root@linux ~]# find /home -user deyu1

	#範例四：搜尋系統中不屬於任何人的檔案
	[root@linux ~]# find / -nouser

	#範例五：找出檔名為 passwd 這個檔案
	[root@linux ~]# find / -name passwd

	#範例六：搜尋檔案屬性為 f (一般檔案) 的檔案
	[root@linux ~]# find /home -type f
	# 例如 socket 與 FIFO 檔案，可以用 find /var -type p 或 -type s 來找

	#範例七：搜尋檔案當中含有 SGID/SUID/SBIT 的屬性
	[root@linux ~]# find / -perm +7000 
	# 7000 是 ---s--s--t ，只要含有 s 或 t 的就列出，
	# 使用 -7000 表示要含有 ---s--s--t 的所有三個權限，

	#範例八：將上個範例找到的檔案使用 ls -l 列出
	[root@linux ~]# find / -perm +7000 -exec ls -l {} \;
	# {} 代表『由 find 找到的內容』
	# 就是將前面找到的那些檔案以 ls -l 列出長的資料！至於 
	# \; 則表示 -exec 的指令結束，一定要存在。

	#範例九：找出系統中，大於 1MB 的檔案
	[root@linux ~]# find / -size +1000k
```

