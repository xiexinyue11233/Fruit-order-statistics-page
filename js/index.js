const dataArr = [
      {
        id:0,
        src: './image/火龙果.png',
        isChecked: false,
        num: 1,
        price: 6,
        total:6,
      },
      {
        id:1,
        src: './image/荔枝.png',
        isChecked: false,
        num: 1,
        price: 20,
        total:20,
      },
      {
        id:2,
        src: './image/榴莲.png',
        isChecked: false,
        num: 1,
        price: 120,
        total:120,
      },
      {
        id:3,
        src: './image/樱桃.png',
        isChecked: false,
        num: 1,
        price: 12,
        total:12,
      },
      {
        id:4,
        src: './image/鸭梨.png',
        isChecked: false,
        num: 1,
        price: 8,
        total:8,
      }
]
//渲染函数
function render() {
    // 循环遍历一个数组，返回一个新的数组。 item是遍历的每一个元素，index是当前元素的下标
    document.querySelector('tbody').innerHTML = dataArr.map((item,index) => {
        return `
         <tr data-id="${index}" class='line'>
            <td><input type="checkbox" class="item-checkbox"  ${item.isChecked ? 'checked' : ''} ></td>
            <td><img src=${item.src} alt=""></td>
            <td>${item.price}</td>
            <td >
                <div class="conut">  
                <span class="subtract">-</span>
                <span class="number">${item.num}</span>
                <span class="plus">+</span>
            </div>
            </td>
            <td class="subtotal">${(item.price * item.num).toFixed(2)}</td>
            <td><div class="del">删除</div></td>
        </tr>
        `
    }).join('')//将返回的新数组拼接成一个字符串，字符串之间以‘’链接
}
// 展示列表
render()

//总计
function calcTotal() {
    // arr.filter()方法是筛选数组 留下满足条件的 返回满足条件的新数组
    // 比如 const nums = [3, 12, 5, 20, 8];
        // const res = nums.filter(n =>  return n > 10);

    // arr.reduce((sum,cur) => { sum +cur},0) 通过reduce求和 在里面的sum是累计器上一次 return 的值  cur是当前遍历到的元素
    const count = dataArr.filter(ele => ele.isChecked).reduce((sum,cur) => sum + cur.num,0)
    const totals = dataArr.reduce((sum,cur) => cur.isChecked ? sum + cur.num*cur.price : sum,0)
    document.querySelector('.price').textContent = totals.toFixed(2)
    console.log(totals);
    
    document.querySelector('.pay').textContent = `结算(${count})`
}

// 通过事件委托给复选框绑定点击事件
document.querySelector('tbody').addEventListener('change',e => {
//    点击的如果是 复选框 
    if(e.target.classList.contains('item-checkbox')){
        // 获取这一行的索引下标
    const id = e.target.closest('tr').dataset.id 
    // console.log(id);
    //  e.target.checked代表的是所点击的这个复选框 将这个复选框状态赋值给数组里的复选框
    dataArr[id].isChecked = e.target.checked
    calcTotal()
   }
   
})
calcTotal()
// 事件委托
document.querySelector('tbody').addEventListener('click', e => {

     // closest是dom元素的一个方法，用来查找从自己开始，沿着祖先链向上查找，直到找到第一个
        // 匹配的给定元素
        // 获取所点击元素最接近的tr祖先元素
        const tr = e.target.closest('tr')
        // 如果点击的元素上没有叫tr的元素就退出
        if (!tr) return;
        // tr内data-id里面的值是和当前元素索引值是对应的
        const id = tr.dataset.id
        // 通过索引值找到对应的哪一行元素
        const item = dataArr[id]
        

    // 事件委托 e.traget是指所点击的那个节点元素 
    // classList是指该节点上所有class组成的对象
    // contains是指所点击的这个节点元素的class组成的对象有没有包含某个指定的class
    // del是指定的class名
    // 删除
    if(e.target.classList.contains('del')){
        // console.log('你点击的是删除');
        // 获取这个tr元素的自定义data-id
        console.log(tr.dataset.id);
        // 删除点击的哪一行元素，通过删除对应元素在数组的下标
        dataArr.splice(tr.dataset.id,1)
        if (dataArr.length === 0 ) {
        document.querySelector('tfoot').classList = 'show'
        }
    }else if (e.target.classList.contains('subtract')){
        // num -1 与0 对比 返回最大的数赋值给num num最小为0 
       item.num = Math.max(0,item.num -1)
    }else if (e.target.classList.contains('plus')){
        item.num += 1
    }else {
        return
    }
    
    calcTotal()
    render()
})

// 全选 获取全选的按钮 检测全选框状态是否发生变化 变化了就把全选框的勾选状态 赋值给数组中的每一个
// 复选框 文本显示也要同步
const checkAll = document.getElementById('checkAll');
checkAll.addEventListener('change', e => {
    dataArr.forEach(item => {
        item.isChecked = e.target.checked
    })
    document.querySelectorAll('.item-checkbox').forEach(ele => {
        ele.checked = e.target.checked
    })
    // 是否勾选影响页面总计 再次调用更新
    calcTotal()
})
// 『全选』按钮的双向同步
function syncCheckAll() {
    // 判定数组中ischecked的值是否都相同 全同则返回ture 只要有一个不同就返回false
    const All = dataArr.every(it => it.isChecked)
    // 将结果赋值给全选框 
    checkAll.checked = All
}