# gitbook-plugin-index-list
> Create a listing of pages in a chapter

## Usage

For the following directory structure:

```
...
1-My Chapter/
├─ 0-README.md
├─ 1-Page A.md
├─ 2-Page B.md
├─ 3-Page C.md
└─ 4-Page D.md
...
```

where `1-My Chapter/0-README.md` has the following contents:
```
# My Chapter

{% index %}{% endindex %}
```

the plugin will produce this output:

> # My Chapter
>
> * <a href="javascript:alert('Link to Page A')">Page A</a>
> * <a href="javascript:alert('Link to Page B')">Page B</a>
> * <a href="javascript:alert('Link to Page C')">Page C</a>
> * <a href="javascript:alert('Link to Page D')">Page D</a>
