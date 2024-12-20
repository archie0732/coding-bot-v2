# coffee-bot

一個使用google drive API 與 bun typescript 寫成的 `judge` 

包含: `leetcode profile api` `codeforce api`


安裝依賴(bun):

```bash
bun install
```
本地啟動

```bash
bun run dev
```

>[!note]
> 請先取得 `google drive api`
> 若沒有請向開發者 archie0732 索取


## Command

- `/leetcodeProfile` + `<username>`: 查詢leetcode 的該名用戶
>包含
>
> `使用者名稱` `解題數` `題目正確率` `最近答題狀況`

- `/codeforcePorfile` + `<username>`: 查詢codeforce 的該名用戶
>包含
>
> `使用者名稱` `解題數` `題目正確率` `最近答題狀況`


- `/judge` 改作業： 需要同意存取google drive ，詳情： `googledriveAPI`

