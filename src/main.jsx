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
   <div className="brand-row"><div className="brand">PayGate</div><div className="header-actions">
     <button className="header-btn" onClick={()=>toast('暂无新通知')}>♧<i/></button>
     <button className="header-btn" onClick={()=>toast('扫码功能')}>⌕</button>
   </div></div>
   <div className="merchant-row"><span>商户 A</span><span className="verified">✓</span><button className="switch" onClick={()=>toast('商户切换')}>⌄</button></div>
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
 return <section className="card"><div className="section-head"><h2>收款方式</h2><button className="link" onClick={()=>toast('打开收款方式管理')}>管理收款方式 ›</button></div>
   <div className="payment-grid">
    <Pay icon="微" tone="wechat" name="微信支付" toast={toast}/><Pay icon="支" tone="alipay" name="支付宝" toast={toast}/><Pay icon="▤" tone="bank" name="银行卡收款" toast={toast}/>
   </div>
 </section>
}
function Pay({icon,tone,name,toast}){return <button className="pay" onClick={()=>toast(name)}><span className={'pay-logo '+tone}>{icon}</span><strong>{name}</strong><em>已开启</em></button>}

function Chart(){
 return <section className="card chart-card"><div className="section-head"><h2>收入趋势（近7天）</h2><button className="period" onClick={()=>alert('近7天')}>近7天⌄</button></div>
   <div className="chart-wrap"><div className="y-axis"><span>4,000</span><span>3,000</span><span>2,000</span><span>1,000</span><span>0</span></div>
    <div className="chart"><div className="grid">{[1,2,3,4,5].map(i=><i key={i}/>)}</div>
     <svg viewBox="0 0 700 220" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2879f5" stopOpacity=".22"/><stop offset="1" stopColor="#2879f5" stopOpacity=".02"/></linearGradient></defs>
      <path d="M15 188L126 145L237 94L348 136L459 62L570 112L685 28L685 205L15 205Z" fill="url(#fill)"/>
      <polyline points="15,188 126,145 237,94 348,136 459,62 570,112 685,28" fill="none" stroke="#2879f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      {[['15','188'],['126','145'],['237','94'],['348','136'],['459','62'],['570','112'],['685','28']].map(([cx,cy])=><circle key={cx} cx={cx} cy={cy} r="5" fill="#fff" stroke="#2879f5" strokeWidth="3"/>)}
     </svg>
    </div>
   </div><div className="dates">{['05-07','05-08','05-09','05-10','05-11','05-12','05-13'].map(x=><span key={x}>{x}</span>)}</div>
 </section>
}

function Orders({openOrder}){
 return <section className="card orders"><div className="section-head"><h2>最新订单</h2><button className="link" onClick={()=>openOrder(orders[0])}>全部订单 ›</button></div>
   {orders.map(o=><button className="order-row" key={o.id} onClick={()=>openOrder(o)}>
    <span className={'pay-dot '+o.tone}>{o.method==='微信支付'?'微':o.method==='支付宝'?'支':o.method==='银行卡'?'▤':'₮'}</span>
    <span className="order-no">{o.id}</span><strong>{o.amount} <small>{o.currency}</small></strong><span>{o.method}</span><em className={o.status==='已支付'?'paid':o.status==='处理中'?'processing':'cancelled'}>{o.status}</em>
   </button>)}
 </section>
}

function Quick({toast}){return <section className="quick-grid">
 {[
  ['create','▤','创建订单','快速创建收款订单'],['qr','▦','收款二维码','展示收款二维码'],['link','↗','支付链接','分享收款链接'],['withdraw','▤','资金提现','提取到银行卡/钱包']
 ].map(x=><button className="quick" key={x[2]} onClick={()=>toast(x[2])}><span className={'quick-icon '+x[0]}>{x[1]}</span><strong>{x[2]}</strong><small>{x[3]}</small></button>)}
 </section>}

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
