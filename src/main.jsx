import React, {useState} from 'react'
import {createRoot} from 'react-dom/client'
import '../styles/app.css'

const orders=[
 {id:'ORD202405130001',amount:'100.00',currency:'USDT',method:'微信支付',status:'已支付',tone:'green'},
 {id:'ORD202405130002',amount:'50.00',currency:'CNY',method:'支付宝',status:'处理中',tone:'blue'},
 {id:'ORD202405130003',amount:'200.00',currency:'CNY',method:'微信支付',status:'已支付',tone:'green'},
 {id:'ORD202405130004',amount:'300.00',currency:'CNY',method:'银行卡',status:'已取消',tone:'orange'},
 {id:'ORD202405130005',amount:'120.00',currency:'USDT',method:'USDT-ERC20',status:'已支付',tone:'teal'}
]

function Icon({children,className=''}){return <span className={'icon '+className}>{children}</span>}

function Header({toast}){
 return <header className="header">

   <div className="brand-row">

     <div className="brand-area">
       <div className="brand">PayGate</div>
       <span className="brand-badge">商户中心</span>
     </div>

     <div className="header-actions">

       <button
         className="header-btn"
         onClick={()=>toast('暂无新通知')}
         aria-label="通知"
       >
         ♧
         <i/>
       </button>

       <button
         className="header-btn"
         onClick={()=>toast('扫码功能')}
         aria-label="扫码"
       >
         ⌕
       </button>

     </div>

   </div>

   <div className="merchant-row">

     <span className="merchant-avatar">A</span>

     <div className="merchant-info">
       <strong>商户 A</strong>
       <small>已认证商户</small>
     </div>

     <span className="verified">✓</span>

     <button
       className="switch"
       onClick={()=>toast('商户切换')}
       aria-label="切换商户"
     >
       ⌄
     </button>

   </div>

 </header>
}

function Balance({hidden,setHidden}){
 return <section className="balance-card">

   <div className="balance-head">
     <span>总资产（USDT）</span>
     <button onClick={()=>setHidden(!hidden)}>
       {hidden?'○':'◉'}
     </button>
   </div>

   <div className="balance-value">
     {hidden?'••••••':'10,245.32'}
   </div>

   <div className="balance-usd">
     ≈ $10,245.32
   </div>

   <div className="balance-divider"/>

   <div className="balance-stats">

     <div>
       <span>可用余额</span>
       <b>{hidden?'••••':'8,245.32'}</b>
       <small>可用于收款</small>
     </div>

     <div>
       <span>待结算</span>
       <b>{hidden?'••••':'1,500.00'}</b>
       <small>结算中</small>
     </div>

     <div>
       <span>冻结金额</span>
       <b>{hidden?'••••':'500.00'}</b>
       <small>暂不可用</small>
     </div>

     <div>
       <span>今日收入</span>
       <b>{hidden?'••••':'2,345.21'}</b>
       <small>今日累计</small>
     </div>

   </div>

   <div className="balance-orders">
     <span>今日订单</span>
     <b>{hidden?'••••':'152'} <small>笔</small></b>
   </div>

 </section>
}

function Payments({toast}) {
 return <section className="card">

   <div className="section-head">
     <h2>收款方式</h2>
     <button
       className="link"
       onClick={()=>toast('打开收款方式管理')}
     >
       管理收款方式 ›
     </button>
   </div>

   <div className="payment-grid">

     <Pay
       icon="微"
       tone="wechat"
       name="微信支付"
       desc="扫码 / API"
       toast={toast}
     />

     <Pay
       icon="支"
       tone="alipay"
       name="支付宝"
       desc="扫码 / API"
       toast={toast}
     />

     <Pay
  icon="▣"
  tone="bank"
  name="银行卡"
  desc="银行卡转账"
  toast={toast}
/>

     <Pay
       icon="₮"
       tone="usdt"
       name="USDT"
       desc="TRC20"
       toast={toast}
     />

   </div>

 </section>
}

function Pay({icon,tone,name,desc,toast}){
 return <button
   className="pay"
   onClick={()=>toast(name)}
 >

   <span className={'pay-logo '+tone}>
     {icon}
   </span>

   <strong>{name}</strong>

   <small className="pay-desc">
     {desc}
   </small>

   <em>已开启</em>

 </button>
}

function Chart(){

 const data=[
   ['05-07','1,820'],
   ['05-08','2,460'],
   ['05-09','3,180'],
   ['05-10','2,520'],
   ['05-11','3,620'],
   ['05-12','2,980'],
   ['05-13','4,120']
 ]

 return <section className="card chart-card">

   <div className="section-head">
     <div>
       <h2>收入趋势</h2>
       <small className="chart-subtitle">近7天收款金额</small>
     </div>

     <button
       className="period"
       onClick={()=>alert('时间范围选择')}
     >
       近7天⌄
     </button>
   </div>

   <div className="chart-total">
     <strong>20,700.00</strong>
     <span>USDT</span>
     <em>↑ 12.6%</em>
   </div>

   <div className="chart-wrap">

     <div className="y-axis">
       <span>4,000</span>
       <span>3,000</span>
       <span>2,000</span>
       <span>1,000</span>
       <span>0</span>
     </div>

     <div className="chart">

       <div className="grid">
         {[1,2,3,4,5].map(i=>
           <i key={i}/>
         )}
       </div>

       <svg
         viewBox="0 0 700 220"
         preserveAspectRatio="none"
       >

         <defs>
           <linearGradient
             id="fill"
             x1="0"
             y1="0"
             x2="0"
             y2="1"
           >
             <stop
               offset="0"
               stopColor="#2879f5"
               stopOpacity=".22"
             />

             <stop
               offset="1"
               stopColor="#2879f5"
               stopOpacity=".02"
             />
           </linearGradient>
         </defs>

         <path
           d="M15 188L126 145L237 94L348 136L459 62L570 112L685 28L685 205L15 205Z"
           fill="url(#fill)"
         />

         <polyline
           points="15,188 126,145 237,94 348,136 459,62 570,112 685,28"
           fill="none"
           stroke="#2879f5"
           strokeWidth="4"
           strokeLinecap="round"
           strokeLinejoin="round"
         />

         {[
           ['15','188'],
           ['126','145'],
           ['237','94'],
           ['348','136'],
           ['459','62'],
           ['570','112'],
           ['685','28']
         ].map(([cx,cy])=>
           <circle
             key={cx}
             cx={cx}
             cy={cy}
             r="5"
             fill="#fff"
             stroke="#2879f5"
             strokeWidth="3"
           />
         )}

       </svg>

     </div>

   </div>

   <div className="dates">
     {data.map(x=>
       <span key={x[0]}>{x[0]}</span>
     )}
   </div>

 </section>
}
 const [period,setPeriod]=useState('7天')

 const data={
   '7天':{
     values:[1850,2450,3100,2700,3650,2950,3980],
     dates:['08-27','08-28','08-29','08-30','08-31','09-01','09-02']
   },
   '30天':{
     values:[2100,2800,2450,3300,2900,3600,3980],
     dates:['08-04','08-09','08-14','08-19','08-24','08-29','09-02']
   },
   '90天':{
     values:[1800,2350,2100,2900,2650,3400,3980],
     dates:['06-04','06-19','07-04','07-19','08-03','08-18','09-02']
   }
 }

 const current=data[period]
 const max=4000

 const points=current.values.map((v,i)=>{
   const x=15+(670/6)*i
   const y=205-(v/max)*177
   return [x,y]
 })

 const line=points.map(p=>p.join(',')).join(' ')
 const area=`M${points[0][0]} ${points[0][1]} L${points.slice(1).map(p=>`${p[0]} ${p[1]}`).join(' L')} L685 205 L15 205 Z`

 return <section className="card chart-card">

   <div className="section-head">
     <h2>收入趋势</h2>

     <div style={{display:'flex',gap:'4px'}}>
       {['7天','30天','90天'].map(x=>
         <button
           key={x}
           className="period"
           onClick={()=>setPeriod(x)}
           style={{
             background:period===x?'#eaf2ff':'#f5f7fa',
             color:period===x?'#1769ee':'#4d5a6c',
             fontWeight:period===x?'600':'400'
           }}
         >
           {x}
         </button>
       )}
     </div>
   </div>

   <div className="chart-wrap">

     <div className="y-axis">
       <span>4,000</span>
       <span>3,000</span>
       <span>2,000</span>
       <span>1,000</span>
       <span>0</span>
     </div>

     <div className="chart">

       <div className="grid">
         {[1,2,3,4,5].map(i=><i key={i}/>)}
       </div>

       <svg
         viewBox="0 0 700 220"
         preserveAspectRatio="none"
       >

         <defs>
           <linearGradient
             id="incomeFill"
             x1="0"
             y1="0"
             x2="0"
             y2="1"
           >
             <stop
               offset="0"
               stopColor="#2879f5"
               stopOpacity=".22"
             />

             <stop
               offset="1"
               stopColor="#2879f5"
               stopOpacity=".02"
             />
           </linearGradient>
         </defs>

         <path
           d={area}
           fill="url(#incomeFill)"
         />

         <polyline
           points={line}
           fill="none"
           stroke="#2879f5"
           strokeWidth="4"
           strokeLinecap="round"
           strokeLinejoin="round"
         />

         {points.map(([cx,cy],i)=>
           <circle
             key={i}
             cx={cx}
             cy={cy}
             r="5"
             fill="#fff"
             stroke="#2879f5"
             strokeWidth="3"
           />
         )}

       </svg>

     </div>
   </div>

   <div className="dates">
     {current.dates.map(x=>
       <span key={x}>{x}</span>
     )}
   </div>

 </section>
}

function Orders({openOrder}){
 return <section className="card orders">

   <div className="section-head">
     <h2>最新订单</h2>
     <button
       className="link"
       onClick={()=>openOrder(orders[0])}
     >
       全部订单 ›
     </button>
   </div>

   <div className="home-order-list">

     {orders.slice(0,4).map(o=>
       <button
         className="home-order"
         key={o.id}
         onClick={()=>openOrder(o)}
       >

         <span className={'home-order-icon '+o.tone}>
           {o.method==='微信支付'
             ?'微'
             :o.method==='支付宝'
             ?'支'
             :o.method==='银行卡'
             ?'▤'
             :'₮'}
         </span>

         <span className="home-order-main">

           <strong>{o.id}</strong>

           <small>
             {o.method} · {o.time || '09-02 10:30'}
           </small>

         </span>

         <span className="home-order-right">

           <b>+{o.amount}</b>

           <em className={
             o.status==='已支付'
               ?'paid'
               :o.status==='处理中'
               ?'processing'
               :'cancelled'
           }>
             {o.status}
           </em>

         </span>

       </button>
     )}

   </div>

 </section>
}

function Quick({toast}){

 const actions=[
   {
     tone:'create',
     icon:'＋',
     title:'创建订单',
     desc:'快速创建收款订单',
     message:'创建订单'
   },
   {
     tone:'qr',
     icon:'▦',
     title:'收款二维码',
     desc:'展示专属收款码',
     message:'收款二维码'
   },
   {
     tone:'link',
     icon:'↗',
     title:'支付链接',
     desc:'生成支付链接',
     message:'支付链接'
   },
   {
     tone:'withdraw',
     icon:'↙',
     title:'资金提现',
     desc:'提现到银行卡/钱包',
     message:'资金提现'
   }
 ]

 return <section className="card quick-card">

   <div className="section-head">
     <h2>快捷操作</h2>
     <span className="quick-hint">常用功能</span>
   </div>

   <div className="quick-grid">

     {actions.map(x=>
       <button
         className="quick"
         key={x.title}
         onClick={()=>toast(x.message)}
       >

         <span className={'quick-icon '+x.tone}>
           {x.icon}
         </span>

         <strong>{x.title}</strong>

         <small>{x.desc}</small>

       </button>
     )}

   </div>

 </section>
}

function OrderDetail({order,back}){
 return <div className="subpage"><div className="sub-head"><button onClick={back}>‹</button><h1>订单详情</h1></div>
  <div className="detail-status"><span className={'status-circle '+order.tone}>✓</span><b>{order.status}</b><small>订单状态</small></div>
  <section className="card detail-card"><div className="detail-amount">¥{order.amount}</div><div className="detail-currency">{order.currency}</div>
   {[['订单号',order.id],['支付方式',order.method],['创建时间','2026-05-13 10:30:21'],['支付时间',order.status==='已支付'?'2026-05-13 10:30:45':'—'],['手续费','¥1.00'],['实际到账','¥99.00']].map(x=><div className="detail-line" key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></div>)}
  </section>
 </div>
}

function OrdersPage({openOrder}){
  const [filter,setFilter]=useState('全部')
  const [keyword,setKeyword]=useState('')

  const filters=['全部','已支付','处理中','已取消']

  const list=orders.filter(o=>{
    const matchStatus=filter==='全部'||o.status===filter
    const matchKeyword=
      !keyword ||
      o.id.toLowerCase().includes(keyword.toLowerCase()) ||
      o.method.includes(keyword)
    return matchStatus&&matchKeyword
  })

  return (
    <div className="subpage orders-page">
      <div className="sub-head">
        <button onClick={()=>window.scrollTo({top:0})}>‹</button>
        <h1>订单</h1>
      </div>

      <div className="order-summary">
        <div>
          <span>今日订单</span>
          <b>152</b>
        </div>
        <div>
          <span>今日收款</span>
          <b>2,345.21</b>
        </div>
        <div>
          <span>成功率</span>
          <b>98.6%</b>
        </div>
      </div>

      <div className="order-search">
        <span>⌕</span>
        <input
          value={keyword}
          onChange={e=>setKeyword(e.target.value)}
          placeholder="搜索订单号或支付方式"
        />
      </div>

      <div className="order-filters">
        {filters.map(x=>(
          <button
            key={x}
            className={filter===x?'selected':''}
            onClick={()=>setFilter(x)}
          >
            {x}
          </button>
        ))}
      </div>

      <section className="card order-list-card">
        <div className="list-title">
          <h2>订单列表</h2>
          <span>{list.length} 笔</span>
        </div>

        {list.map(o=>(
          <button
            className="full-order"
            key={o.id}
            onClick={()=>openOrder(o)}
          >
            <div className={'pay-dot '+o.tone}>
              {o.method==='微信支付'
                ?'微'
                :o.method==='支付宝'
                ?'支'
                :o.method==='银行卡'
                ?'▤'
                :'₮'}
            </div>

            <div className="full-order-main">
              <strong>{o.id}</strong>
              <span>{o.method} · 2026-05-13 10:30</span>
            </div>

            <div className="full-order-right">
              <b>{o.amount} <small>{o.currency}</small></b>
              <em className={
                o.status==='已支付'
                ?'paid'
                :o.status==='处理中'
                ?'processing'
                :'cancelled'
              }>
                {o.status}
              </em>
            </div>
          </button>
        ))}

        {list.length===0 && (
          <div className="empty-orders">
            <div>⌕</div>
            <b>没有找到订单</b>
            <span>请修改搜索条件或状态筛选</span>
          </div>
        )}
      </section>
    </div>
  )
}
function WalletPage({toast}){
  const [showAll,setShowAll]=useState(false)

  const records=[
    {type:'充值',title:'账户充值',desc:'银行卡入账',amount:'+1,000.00',time:'09-02 10:42',tone:'blue'},
    {type:'收款',title:'微信收款',desc:'订单 ORD202609020001',amount:'+100.00',time:'09-02 10:30',tone:'green'},
    {type:'收款',title:'支付宝收款',desc:'订单 ORD202609020002',amount:'+50.00',time:'09-02 10:26',tone:'blue'},
    {type:'提现',title:'提现到银行卡',desc:'尾号 8821',amount:'-500.00',time:'09-02 09:18',tone:'orange'}
  ]

  return (
    <div className="subpage wallet-page">

      <div className="sub-head">
        <button onClick={()=>toast('返回首页')}>‹</button>
        <h1>钱包</h1>
      </div>

      <section className="wallet-balance">
        <div className="wallet-balance-top">
          <span>可用余额</span>
          <button onClick={()=>toast('余额已刷新')}>↻</button>
        </div>

        <strong>¥12,680.50</strong>

        <div className="wallet-balance-bottom">
          <span>总资产 ¥13,280.50</span>
          <span>冻结 ¥600.00</span>
        </div>
      </section>

      <div className="wallet-actions">

        <button onClick={()=>toast('充值功能')}>
          <span className="wallet-action-icon recharge">＋</span>
          <b>充值</b>
          <small>资金入账</small>
        </button>

        <button onClick={()=>toast('提现功能')}>
          <span className="wallet-action-icon withdraw">↗</span>
          <b>提现</b>
          <small>转到银行卡</small>
        </button>

        <button onClick={()=>toast('资金流水')}>
          <span className="wallet-action-icon flow">↕</span>
          <b>资金流水</b>
          <small>查看明细</small>
        </button>

      </div>

      <section className="card wallet-info-card">

        <div className="section-head">
          <h2>资金概览</h2>
        </div>

        <div className="wallet-info-grid">

          <div>
            <span>今日收入</span>
            <b>¥2,345.21</b>
          </div>

          <div>
            <span>今日支出</span>
            <b>¥500.00</b>
          </div>

          <div>
            <span>待结算</span>
            <b>¥860.40</b>
          </div>

          <div>
            <span>累计收入</span>
            <b>¥86,520.80</b>
          </div>

        </div>

      </section>

      <section className="card wallet-record-card">

        <div className="section-head">
          <h2>最近流水</h2>

          <button
            className="link"
            onClick={()=>setShowAll(!showAll)}
          >
            {showAll?'收起':'全部'}
          </button>
        </div>

        {(showAll?records:records.slice(0,3)).map((r,i)=>(
          <div className="wallet-record" key={i}>

            <div className={'wallet-record-icon '+r.tone}>
              {r.type==='充值'?'＋':r.type==='提现'?'↗':'¥'}
            </div>

            <div className="wallet-record-main">
              <strong>{r.title}</strong>
              <span>{r.desc}</span>
              <small>{r.time}</small>
            </div>

            <b className={r.amount.startsWith('+')?'income':'expense'}>
              {r.amount}
            </b>

          </div>
        ))}

      </section>

      <div className="wallet-tip">
        <span>✓</span>

        <div>
          <b>资金安全提示</b>
          <small>所有资金操作均需要完成商户安全验证</small>
        </div>
      </div>

    </div>
  )
}
function Placeholder({title,desc,back}){
 return <div className="subpage"><div className="sub-head"><button onClick={back}>‹</button><h1>{title}</h1></div><section className="card placeholder"><Icon className="placeholder-icon">◈</Icon><h2>{title}</h2><p>{desc}</p><button className="primary">继续建设</button></section></div>
}

function App(){
 const [tab,setTab]=useState('home'),[hidden,setHidden]=useState(false),[detail,setDetail]=useState(null),[toastMsg,setToastMsg]=useState('')
 const toast=t=>{setToastMsg(t);clearTimeout(window.__pg);window.__pg=setTimeout(()=>setToastMsg(''),1300)}
 const nav=(t)=>{setDetail(null);setTab(t);window.scrollTo({top:0,behavior:'smooth'})}
 if(detail) return <div className="app"><OrderDetail order={detail} back={()=>setDetail(null)}/>{toastMsg&&<div className="toast">{toastMsg}</div>}</div>
 const page = tab==='home'?<><Header toast={toast}/><main><Balance hidden={hidden} setHidden={setHidden}/><Payments toast={toast}/><Chart/><Orders openOrder={setDetail}/><Quick toast={toast}/></main></>:
  tab==='orders'?<><Header toast={toast}/><main><OrdersPage openOrder={setDetail}/></main></>:
  tab==='wallet'?<><Header toast={toast}/><main><WalletPage toast={toast}/></main></>:
  tab==='settlement'?<><Header toast={toast}/><main><Placeholder title="结算" desc="待结算、自动结算和历史结算。"/></main></>:
  <><Header toast={toast}/><main><Placeholder title="我的" desc="商户资料、安全设置、收款方式和 API 管理。"/></main></>
 return <div className="app">{page}<nav className="bottom">{[['home','⌂','首页'],['orders','▣','订单'],['wallet','▱','钱包'],['settlement','⇄','结算'],['me','♙','我的']].map(x=><button className={tab===x[0]?'active':''} onClick={()=>nav(x[0])} key={x[0]}><span>{x[1]}</span><b>{x[2]}</b></button>)}</nav>{toastMsg&&<div className="toast">{toastMsg}</div>}</div>
}
createRoot(document.getElementById('root')).render(<App/>)
