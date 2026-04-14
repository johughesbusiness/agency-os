import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react'
import { useState } from "react";

const C = {
  bg:"#060609", surface:"#0c0c14", card:"#10101c",
  border:"#1a1a28", borderHi:"#26263a",
  accent:"#7b6fff", accentLo:"#7b6fff14", accentMid:"#7b6fff35",
  emerald:"#0fd99a", emeraldLo:"#0fd99a14",
  gold:"#f4c430", goldLo:"#f4c43014",
  rose:"#ff4d6d", roseLo:"#ff4d6d14",
  amber:"#fb923c", amberLo:"#fb923c14",
  sky:"#38bdf8", skyLo:"#38bdf814",
  purple:"#c084fc", purpleLo:"#c084fc14",
  slack:"#e01e5a", gcal:"#4285f4", ghl:"#f97316",
  yt:"#ff2d2d", ig:"#e1306c", fb:"#1877f2", tk:"#25f4ee",
  snap:"#ffdd00", x:"#aaaacc", tks:"#ff004f",
  shopify:"#96bf48", woo:"#7f54b3", etsy:"#f1641e", square:"#6699aa", tiktokshop:"#ff004f",
  gads:"#4285f4", meta:"#1877f2",
  klaviyo:"#87d4c5", mailchimp:"#ffe01b",
  text:"#e6e6f8", sub:"#7a7a9a", muted:"#3a3a52",
};

const PLAT = {
  youtube:   {label:"YouTube",   color:C.yt,   icon:"▶", short:"YT"},
  instagram: {label:"Instagram", color:C.ig,   icon:"◈", short:"IG"},
  facebook:  {label:"Facebook",  color:C.fb,   icon:"ƒ", short:"FB"},
  tiktok:    {label:"TikTok",    color:C.tk,   icon:"♪", short:"TK"},
  snapchat:  {label:"Snapchat",  color:C.snap, icon:"◉", short:"SC"},
  x:         {label:"X",        color:C.x,    icon:"✕", short:"X"},
};
const ECOM = {
  shopify:    {label:"Shopify",     color:C.shopify,    icon:"🛍"},
  woocommerce:{label:"WooCommerce", color:C.woo,        icon:"🛒"},
  etsy:       {label:"Etsy",        color:C.etsy,       icon:"🧶"},
  square:     {label:"Square",      color:C.square,     icon:"⬛"},
  tiktokshop: {label:"TikTok Shop", color:C.tiktokshop, icon:"🎁"},
};
const ADS   = { google:{label:"Google Ads",color:C.gads,icon:"G"}, meta:{label:"Meta Ads",color:C.meta,icon:"M"} };
const EMAIL  = { klaviyo:{label:"Klaviyo",color:C.klaviyo,icon:"K"}, mailchimp:{label:"Mailchimp",color:C.mailchimp,icon:"✉"} };
const INFL_STATUS = {
  outreach:"#555577", negotiating:C.amber, contracted:C.sky, posted:C.emerald, paid:C.purple,
};
const INFL_TIER = {
  nano: {label:"Nano",  range:"1K–10K",   color:C.emerald},
  micro:{label:"Micro", range:"10K–100K", color:C.sky},
  macro:{label:"Macro", range:"100K–1M",  color:C.purple},
  mega: {label:"Mega",  range:"1M+",      color:C.gold},
};

const fmt      = n => n>=1e6?`${(n/1e6).toFixed(1)}M`:n>=1000?`${(n/1000).toFixed(1)}K`:String(n||0);
const fmtMoney = n => n>=1000?`$${(n/1000).toFixed(1)}K`:`$${(n||0).toFixed(0)}`;
const uid      = () => Math.random().toString(36).slice(2,9);
const dayOff   = n  => { const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); };
const fmtDate  = s  => new Date(s+"T00:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"});
const daysUntil= s  => Math.round((new Date(s+"T00:00:00")-new Date(new Date().toDateString()))/86400000);
const genCode  = n  => n.toUpperCase().replace(/[^A-Z]/g,"").slice(0,4)+(Math.floor(Math.random()*90)+10);
const genUTM   = n  => `https://yourstore.com?utm_source=influencer&utm_campaign=${n.toLowerCase().replace(/\s+/g,"_")}`;

const DEMO = [
  {
    id:"c1", name:"Apex Fitness", color:C.emerald,
    ghlContactId:"", slackChannel:"", reportEmail:"",
    social:{
      youtube:  {connected:true, followers:48200,growth:3.2,views:2140000,videos:[{title:"Body Transformation 90 Days",views:184000,likes:9200,comments:412,eng:5.2},{title:"Honest Supplement Review",views:98000,likes:5100,comments:741,eng:5.9}],trend:[12,15,18,22,28,35,42,48]},
      instagram:{connected:true, followers:22400,growth:5.8,views:890000, videos:[{title:"Morning Routine Reel",views:84000,likes:6200,comments:310,eng:7.8},{title:"Transformation Story",views:61000,likes:4800,comments:198,eng:8.2}],trend:[8,10,12,14,17,19,21,22]},
      facebook: {connected:true, followers:14800,growth:1.1,views:320000, videos:[{title:"Live Q&A Replay",views:21000,likes:1200,comments:231,eng:6.8}],trend:[9,10,11,12,13,14,14,15]},
      tiktok:   {connected:true, followers:31000,growth:8.4,views:1200000,videos:[{title:"5 Gym Mistakes",views:420000,likes:38000,comments:1200,eng:9.3},{title:"Pre-Workout Review",views:180000,likes:14000,comments:440,eng:7.9}],trend:[5,8,12,16,22,26,29,31]},
      snapchat: {connected:false,followers:0,growth:0,views:0,videos:[],trend:[]},
      x:        {connected:false,followers:0,growth:0,views:0,videos:[],trend:[]},
    },
    ecommerce:{
      shopify:    {connected:true, revenue:84200,orders:1840,aov:45.8,topProducts:[{name:"Whey Protein",sales:320,revenue:12800},{name:"Resistance Bands",sales:218,revenue:6540},{name:"Pre-Workout Stack",sales:195,revenue:9750}],trend:[8200,9400,10100,11800,13200,14900,15400,18200]},
      tiktokshop: {connected:true, revenue:18400,orders:612,aov:30.1, topProducts:[{name:"Gym Gloves",sales:188,revenue:3760},{name:"Shaker Bottle",sales:162,revenue:2916}],trend:[1200,1800,2400,2900,3100,3800,4200,4900]},
      woocommerce:{connected:false}, etsy:{connected:false}, square:{connected:false},
    },
    ads:{
      google:{connected:true, spend:3200,revenue:18400,roas:5.75,clicks:8420,impressions:184000,ctr:4.58,campaigns:[{name:"Brand Search",spend:800,revenue:6200,roas:7.75},{name:"Shopping — Protein",spend:1400,revenue:8100,roas:5.79},{name:"Retargeting",spend:1000,revenue:4100,roas:4.10}]},
      meta:  {connected:true, spend:4800,revenue:22100,roas:4.60,clicks:12400,impressions:420000,ctr:2.95,campaigns:[{name:"Awareness",spend:1200,revenue:4800,roas:4.0},{name:"Conversion",spend:2400,revenue:13200,roas:5.5},{name:"Retargeting",spend:1200,revenue:4100,roas:3.42}]},
    },
    email:{
      klaviyo: {connected:true, subscribers:12400,openRate:38.2,clickRate:4.8,revenue:9200,campaigns:[{name:"Welcome Series",sent:1840,opens:42.1,clicks:6.2,revenue:3200},{name:"Abandoned Cart",sent:920,opens:48.4,clicks:12.1,revenue:4100},{name:"Monthly Newsletter",sent:12400,opens:31.2,clicks:2.8,revenue:1900}]},
      mailchimp:{connected:false},
    },
    influencers:[
      {id:"i1",name:"FitWithJordan",platform:"instagram",followers:84000, tier:"micro",status:"posted",    promoCode:"APEX12",affiliateLink:genUTM("FitWithJordan"), posts:[{url:"https://instagram.com/p/ex1",views:62000,likes:4800,clicks:1240,conversions:88,revenue:3960}],commission:10,totalRevenue:3960,paid:false,contact:"jordan@email.com"},
      {id:"i2",name:"GymRatMike",   platform:"tiktok",  followers:210000,tier:"macro",status:"posted",    promoCode:"APEX34",affiliateLink:genUTM("GymRatMike"),    posts:[{url:"https://tiktok.com/@mike/ex",views:380000,likes:42000,clicks:3200,conversions:194,revenue:8730}],commission:10,totalRevenue:8730,paid:false,contact:"mike@email.com"},
      {id:"i3",name:"LiftWithLaura",platform:"youtube",  followers:48000, tier:"micro",status:"contracted",promoCode:"APEX56",affiliateLink:genUTM("LiftWithLaura"),posts:[],commission:10,totalRevenue:0,paid:false,contact:"laura@email.com"},
      {id:"i4",name:"NutritionNate",platform:"instagram",followers:9200,  tier:"nano", status:"outreach",  promoCode:"APEX78",affiliateLink:genUTM("NutritionNate"),posts:[],commission:8, totalRevenue:0,paid:false,contact:""},
    ],
    calendar:[
      {id:"ev1",title:"Gym Transformation Video",platform:"youtube",  date:dayOff(1),time:"09:00",status:"editing",  notes:"B-roll done"},
      {id:"ev2",title:"Morning Routine Reel",     platform:"instagram",date:dayOff(2),time:"11:00",status:"scheduled",notes:""},
      {id:"ev3",title:"Supplement Q&A",           platform:"facebook", date:dayOff(4),time:"14:00",status:"scripting",notes:""},
      {id:"ev4",title:"5 Gym Mistakes",           platform:"tiktok",   date:dayOff(6),time:"18:00",status:"filming",  notes:"Shoot Friday"},
    ],
  },
  {
    id:"c2", name:"Nova Boutique", color:C.purple,
    ghlContactId:"", slackChannel:"", reportEmail:"",
    social:{
      youtube:  {connected:true, followers:12400,growth:2.1,views:540000, videos:[{title:"Spring Haul",views:42000,likes:2100,comments:189,eng:5.5}],trend:[4,5,6,7,8,9,11,12]},
      instagram:{connected:true, followers:38000,growth:7.2,views:1400000,videos:[{title:"OOTD Reel",views:120000,likes:11000,comments:480,eng:9.6},{title:"New Arrivals",views:84000,likes:7200,comments:310,eng:8.9}],trend:[14,17,20,24,28,32,36,38]},
      tiktok:   {connected:true, followers:54000,growth:11.2,views:2100000,videos:[{title:"Styling 5 Outfits",views:580000,likes:61000,comments:2100,eng:10.9},{title:"Thrift Flip",views:240000,likes:22000,comments:880,eng:9.5}],trend:[8,12,18,26,34,42,49,54]},
      facebook: {connected:false,followers:0,growth:0,views:0,videos:[],trend:[]},
      snapchat: {connected:false,followers:0,growth:0,views:0,videos:[],trend:[]},
      x:        {connected:false,followers:0,growth:0,views:0,videos:[],trend:[]},
    },
    ecommerce:{
      shopify:    {connected:true, revenue:124000,orders:2840,aov:43.7,topProducts:[{name:"Linen Blazer",sales:480,revenue:33600},{name:"Wrap Dress",sales:360,revenue:18000},{name:"Bucket Hat",sales:290,revenue:5800}],trend:[9800,11200,13400,16800,18200,22100,24900,28200]},
      tiktokshop: {connected:true, revenue:42000,orders:1840,aov:22.8, topProducts:[{name:"Wrap Dress",sales:620,revenue:21700},{name:"Linen Blazer",sales:310,revenue:15500}],trend:[2400,3800,5200,6400,7100,8200,9400,10800]},
      etsy:       {connected:true, revenue:18400,orders:612,aov:30.1,  topProducts:[{name:"Custom Tote",sales:188,revenue:3760},{name:"Embroidered Hat",sales:162,revenue:2916}],trend:[1200,1800,2400,2900,3100,3800,4200,4900]},
      woocommerce:{connected:false}, square:{connected:false},
    },
    ads:{
      google:{connected:false},
      meta:  {connected:true, spend:6200,revenue:34100,roas:5.5,clicks:18400,impressions:620000,ctr:2.97,campaigns:[{name:"Spring Collection",spend:3200,revenue:18400,roas:5.75},{name:"Retargeting",spend:3000,revenue:15700,roas:5.23}]},
    },
    email:{
      klaviyo: {connected:true, subscribers:28400,openRate:42.1,clickRate:6.2,revenue:21400,campaigns:[{name:"New Arrivals",sent:28400,opens:44.2,clicks:8.1,revenue:12400},{name:"Abandoned Cart",sent:1840,opens:52.1,clicks:14.2,revenue:9000}]},
      mailchimp:{connected:false},
    },
    influencers:[
      {id:"i5",name:"StyleByAva",    platform:"instagram",followers:180000,tier:"macro",status:"posted",    promoCode:"NOVA10",affiliateLink:genUTM("StyleByAva"),posts:[{url:"https://instagram.com/p/ex2",views:142000,likes:14200,clicks:4800,conversions:312,revenue:13644}],commission:12,totalRevenue:13644,paid:true, contact:"ava@email.com"},
      {id:"i6",name:"FashionWithRei",platform:"tiktok",  followers:420000,tier:"macro",status:"negotiating",promoCode:"NOVA20",affiliateLink:genUTM("FashionWithRei"),posts:[],commission:12,totalRevenue:0,paid:false,contact:"rei@email.com"},
      {id:"i7",name:"MiniMayaStyle", platform:"instagram",followers:8400, tier:"nano", status:"contracted", promoCode:"NOVA30",affiliateLink:genUTM("MiniMayaStyle"),posts:[],commission:10,totalRevenue:0,paid:false,contact:"maya@email.com"},
    ],
    calendar:[
      {id:"ev5",title:"Spring Lookbook",  platform:"instagram",date:dayOff(0),time:"10:00",status:"scheduled",notes:""},
      {id:"ev6",title:"New Collection",   platform:"tiktok",   date:dayOff(3),time:"18:00",status:"editing",  notes:""},
      {id:"ev7",title:"Style Guide Video",platform:"youtube",  date:dayOff(7),time:"09:00",status:"scripting",notes:""},
    ],
  },
];

const Btn = ({children,onClick,color,outline,small,disabled,full}) =>
  <button onClick={onClick} disabled={disabled} style={{background:disabled?"#1a1a28":outline?"transparent":(color||C.accent),border:outline?`1px solid ${color||C.borderHi}`:"none",borderRadius:9,color:disabled?C.muted:C.text,padding:small?"5px 11px":"9px 18px",cursor:disabled?"not-allowed":"pointer",fontSize:small?11:13,fontWeight:700,width:full?"100%":"auto",opacity:disabled?.5:1,whiteSpace:"nowrap"}}>{children}</button>;

const Inp = ({label,value,onChange,type="text",placeholder=""}) =>
  <div style={{display:"flex",flexDirection:"column",gap:4}}>
    {label&&<label style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>{label}</label>}
    <input type={type} value={value||""} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
      style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",color:C.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box"}}/>
  </div>;

const Sel = ({label,value,onChange,options}) =>
  <div style={{display:"flex",flexDirection:"column",gap:4}}>
    {label&&<label style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>{label}</label>}
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",color:C.text,fontSize:13,outline:"none",width:"100%",boxSizing:"border-box"}}>
      {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>;

const Tag = ({color,children}) =>
  <span style={{background:color+"22",color,border:`1px solid ${color}44`,borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:700,whiteSpace:"nowrap"}}>{children}</span>;

const Card = ({children,style={},accent}) =>
  <div style={{background:C.card,border:`1px solid ${accent?accent+"44":C.border}`,borderRadius:13,padding:18,...style}}>{children}</div>;

const MiniBar = ({data,color,h=32}) => {
  const max=Math.max(...(data||[1]),1);
  return <div style={{display:"flex",alignItems:"flex-end",gap:2,height:h}}>
    {(data||[]).map((v,i)=><div key={i} style={{flex:1,height:`${(v/max)*100}%`,background:i===data.length-1?color:color+"55",borderRadius:2,minHeight:2}}/>)}
  </div>;
};

const MiniLine = ({data,color,w=100,h=32}) => {
  if(!data||data.length<2) return null;
  const max=Math.max(...data),min=Math.min(...data),r=max-min||1;
  const pts=data.map((v,i)=>`${(i/(data.length-1))*w},${h-((v-min)/r)*(h-4)-2}`).join(" ");
  return <svg width={w} height={h} style={{overflow:"visible"}}>
    <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx={w} cy={h-((data[data.length-1]-min)/r)*(h-4)-2} r="3" fill={color}/>
  </svg>;
};

const StatGrid = ({stats}) =>
  <div style={{display:"grid",gridTemplateColumns:`repeat(${stats.length},1fr)`,gap:12,marginBottom:16}}>
    {stats.map((s,i)=>(
      <div key={i} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"13px 15px"}}>
        <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>{s.label}</div>
        <div style={{fontSize:22,fontWeight:800,color:s.color||C.text,fontFamily:"monospace",marginTop:3,letterSpacing:-1}}>{s.val}</div>
        {s.sub&&<div style={{fontSize:11,color:s.up?C.emerald:C.sub,marginTop:2}}>{s.sub}</div>}
      </div>
    ))}
  </div>;

function SocialTab({client}) {
  const conn=Object.entries(client.social||{}).filter(([,v])=>v.connected);
  const [active,setActive]=useState(conn[0]?.[0]||"youtube");
  const pd=client.social?.[active]; const pc=PLAT[active];
  const totalF=conn.reduce((s,[,v])=>s+(v.followers||0),0);
  const totalV=conn.reduce((s,[,v])=>s+(v.views||0),0);
  const fastest=conn.length?[...conn].sort((a,b)=>(b[1].growth||0)-(a[1].growth||0))[0]:null;
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <StatGrid stats={[
      {label:"Total Reach",val:fmt(totalF),color:C.accent},
      {label:"Total Views",val:fmt(totalV)},
      {label:"Platforms",val:`${conn.length}/6`,color:C.emerald},
      {label:"Fastest",val:fastest?PLAT[fastest[0]].label:"—",sub:fastest?`+${fastest[1].growth}%/mo`:"",up:true,color:fastest?PLAT[fastest[0]].color:C.muted},
    ]}/>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {Object.entries(PLAT).map(([p,pc2])=>{
        const d=client.social?.[p]; const on=d?.connected;
        return <button key={p} onClick={()=>on&&setActive(p)} style={{background:active===p&&on?pc2.color+"33":"transparent",border:`1px solid ${active===p&&on?pc2.color:on?C.border:C.border+"55"}`,borderRadius:20,color:on?C.text:C.muted+"88",padding:"5px 14px",cursor:on?"pointer":"default",fontSize:12,fontWeight:active===p?700:400,opacity:on?1:.45,display:"flex",alignItems:"center",gap:5}}>
          {pc2.icon} {pc2.short}{on&&<span style={{fontSize:10,opacity:.7}}> {fmt(d.followers)}</span>}
        </button>;
      })}
    </div>
    {pd?.connected
      ? <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <Card>
            <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>{pc.label} — Growth</div>
            <div style={{fontSize:28,fontWeight:800,color:pc.color,fontFamily:"monospace"}}>{fmt(pd.followers)}</div>
            <div style={{fontSize:12,color:C.emerald,marginBottom:12}}>+{pd.growth}%/mo · {fmt(pd.views)} views</div>
            <MiniBar data={pd.trend} color={pc.color} h={44}/>
          </Card>
          <Card>
            <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Top Videos</div>
            {pd.videos?.map((v,i)=>(
              <div key={i} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}>
                  <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"70%"}}>{v.title}</span>
                  <span style={{color:C.sub,fontFamily:"monospace"}}>{fmt(v.views)}</span>
                </div>
                <div style={{height:4,background:C.border,borderRadius:2}}>
                  <div style={{height:"100%",width:`${(v.views/(pd.videos[0].views||1))*100}%`,background:pc.color,borderRadius:2}}/>
                </div>
                <div style={{fontSize:10,color:v.eng>7?C.emerald:C.sub,marginTop:2}}>{v.eng}% engagement</div>
              </div>
            ))}
          </Card>
        </div>
      : <Card style={{textAlign:"center",padding:32}}><div style={{color:C.muted}}>{pc?.label} not connected</div></Card>
    }
  </div>;
}

function EcomTab({client}) {
  const conn=Object.entries(client.ecommerce||{}).filter(([,v])=>v.connected);
  const [active,setActive]=useState(conn[0]?.[0]||"shopify");
  const pd=client.ecommerce?.[active]; const pc=ECOM[active];
  const totalRev=conn.reduce((s,[,v])=>s+(v.revenue||0),0);
  const totalOrd=conn.reduce((s,[,v])=>s+(v.orders||0),0);
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <StatGrid stats={[
      {label:"Total Revenue",val:fmtMoney(totalRev),color:C.emerald},
      {label:"Total Orders", val:fmt(totalOrd)},
      {label:"Stores",       val:`${conn.length}/5`,color:C.accent},
      {label:"Avg Order",    val:totalOrd?fmtMoney(totalRev/totalOrd):"—"},
    ]}/>
    {conn.length>1&&<Card accent={C.gold}>
      <div style={{fontSize:11,color:C.gold,fontWeight:700,marginBottom:6}}>⚡ CROSS-STORE INSIGHT</div>
      <div style={{fontSize:13,lineHeight:1.7}}>TikTok Shop is driving <strong style={{color:C.tk}}>{fmtMoney(client.ecommerce?.tiktokshop?.revenue||0)}</strong> in revenue. Cross-reference with TikTok video performance to see exactly which videos are converting to sales.</div>
    </Card>}
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      {Object.entries(ECOM).map(([p,ec])=>{
        const d=client.ecommerce?.[p]; const on=d?.connected;
        return <button key={p} onClick={()=>on&&setActive(p)} style={{background:active===p&&on?ec.color+"33":"transparent",border:`1px solid ${active===p&&on?ec.color:on?C.border:C.border+"44"}`,borderRadius:20,color:on?C.text:C.muted+"88",padding:"5px 14px",cursor:on?"pointer":"default",fontSize:12,fontWeight:active===p?700:400,opacity:on?1:.4}}>
          {ec.icon} {ec.label}{on&&<span style={{fontSize:10,color:C.sub,fontFamily:"monospace"}}> {fmtMoney(d.revenue)}</span>}
        </button>;
      })}
    </div>
    {pd?.connected
      ? <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <Card>
            <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:10}}>{pc?.label} Revenue</div>
            <div style={{fontSize:28,fontWeight:800,color:C.emerald,fontFamily:"monospace"}}>{fmtMoney(pd.revenue)}</div>
            <div style={{fontSize:12,color:C.sub,marginBottom:12}}>{fmt(pd.orders)} orders · AOV {fmtMoney(pd.aov)}</div>
            <MiniBar data={pd.trend} color={C.emerald} h={44}/>
          </Card>
          <Card>
            <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:12}}>Top Products</div>
            {pd.topProducts?.map((p2,i)=>(
              <div key={i} style={{marginBottom:12}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:2}}>
                  <span style={{fontWeight:600}}>{p2.name}</span>
                  <span style={{color:C.emerald,fontFamily:"monospace"}}>{fmtMoney(p2.revenue)}</span>
                </div>
                <div style={{fontSize:11,color:C.sub}}>{p2.sales} units</div>
              </div>
            ))}
          </Card>
        </div>
      : <Card style={{textAlign:"center",padding:32}}><div style={{color:C.muted}}>Select a connected store</div></Card>
    }
  </div>;
}

function AdsTab({client}) {
  const gd=client.ads?.google; const md=client.ads?.meta;
  const ts=(gd?.connected?gd.spend:0)+(md?.connected?md.spend:0);
  const tr=(gd?.connected?gd.revenue:0)+(md?.connected?md.revenue:0);
  const roas=ts?tr/ts:0;
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <StatGrid stats={[
      {label:"Total Spend",   val:fmtMoney(ts), color:C.rose},
      {label:"Ad Revenue",    val:fmtMoney(tr),  color:C.emerald},
      {label:"Blended ROAS",  val:`${roas.toFixed(2)}×`, color:roas>4?C.emerald:C.amber},
      {label:"Total Clicks",  val:fmt((gd?.clicks||0)+(md?.clicks||0))},
    ]}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {[["google",gd],[" meta",md]].map(([key2,d])=>{
        const k=key2.trim(); const ac=ADS[k];
        return <Card key={k} accent={ac.color}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontWeight:700,fontSize:14,color:ac.color}}>{ac.label}</div>
              <div style={{fontSize:11,color:d?.connected?C.emerald:C.muted}}>{d?.connected?"● Connected":"Not connected"}</div>
            </div>
            {d?.connected&&<div style={{fontSize:18,fontWeight:800,color:C.emerald,fontFamily:"monospace"}}>{d.roas.toFixed(2)}× ROAS</div>}
          </div>
          {d?.connected?<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
              {[{l:"Spend",v:fmtMoney(d.spend)},{l:"Revenue",v:fmtMoney(d.revenue)},{l:"CTR",v:`${d.ctr}%`}].map(s=>(
                <div key={s.l} style={{background:C.surface,borderRadius:8,padding:"8px 10px"}}>
                  <div style={{fontSize:10,color:C.muted}}>{s.l}</div>
                  <div style={{fontSize:14,fontWeight:700,fontFamily:"monospace"}}>{s.v}</div>
                </div>
              ))}
            </div>
            {d.campaigns?.map((c2,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:`1px solid ${C.border}22`}}>
                <span style={{fontSize:12,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c2.name}</span>
                <span style={{fontSize:11,color:C.sub,margin:"0 8px"}}>{fmtMoney(c2.spend)}</span>
                <span style={{fontSize:12,color:c2.roas>4?C.emerald:C.amber,fontFamily:"monospace",fontWeight:700}}>{c2.roas.toFixed(1)}×</span>
              </div>
            ))}
          </>:<div style={{color:C.muted,fontSize:13}}>Connect {ac.label} to see data</div>}
        </Card>;
      })}
    </div>
  </div>;
}

function EmailTab({client}) {
  const kd=client.email?.klaviyo; const md=client.email?.mailchimp;
  const ts=(kd?.connected?kd.subscribers:0)+(md?.connected?md.subscribers||0:0);
  const tr=(kd?.connected?kd.revenue:0)+(md?.connected?md.revenue||0:0);
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <StatGrid stats={[
      {label:"Subscribers",val:fmt(ts),   color:C.accent},
      {label:"Email Revenue",val:fmtMoney(tr),color:C.emerald},
      {label:"Open Rate",  val:kd?.connected?`${kd.openRate}%`:"—",color:C.sky},
      {label:"Click Rate", val:kd?.connected?`${kd.clickRate}%`:"—",color:C.purple},
    ]}/>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {[["klaviyo",kd],["mailchimp",md]].map(([k,d])=>{
        const ec=EMAIL[k];
        return <Card key={k} accent={ec.color}>
          <div style={{fontWeight:700,fontSize:14,color:ec.color,marginBottom:4}}>{ec.label}</div>
          <div style={{fontSize:11,color:d?.connected?C.emerald:C.muted,marginBottom:12}}>{d?.connected?"● Connected":"Not connected"}</div>
          {d?.connected?<>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              {[{l:"Subscribers",v:fmt(d.subscribers)},{l:"Revenue",v:fmtMoney(d.revenue)},{l:"Open Rate",v:`${d.openRate}%`},{l:"Click Rate",v:`${d.clickRate}%`}].map(s=>(
                <div key={s.l} style={{background:C.surface,borderRadius:8,padding:"8px 10px"}}>
                  <div style={{fontSize:10,color:C.muted}}>{s.l}</div>
                  <div style={{fontSize:14,fontWeight:700,fontFamily:"monospace"}}>{s.v}</div>
                </div>
              ))}
            </div>
            {d.campaigns?.map((c2,i)=>(
              <div key={i} style={{padding:"8px 0",borderBottom:`1px solid ${C.border}22`}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:2}}>
                  <span style={{fontWeight:600}}>{c2.name}</span>
                  <span style={{color:C.emerald,fontFamily:"monospace"}}>{fmtMoney(c2.revenue)}</span>
                </div>
                <div style={{fontSize:11,color:C.sub}}>{fmt(c2.sent)} sent · {c2.opens}% open · {c2.clicks}% click</div>
              </div>
            ))}
          </>:<div style={{color:C.muted,fontSize:13}}>Connect {ec.label} to see campaigns</div>}
        </Card>;
      })}
    </div>
  </div>;
}

function InfluencerRow({inf,onUpdate,onDelete}) {
  const [open,setOpen]=useState(false);
  const [url,setUrl]=useState("");
  const pc=PLAT[inf.platform];
  const tier=INFL_TIER[inf.tier];
  const totalV=inf.posts?.reduce((s,p)=>s+(p.views||0),0)||0;
  const totalC=inf.posts?.reduce((s,p)=>s+(p.clicks||0),0)||0;
  const addPost=()=>{
    if(!url.trim()) return;
    onUpdate({...inf,posts:[...(inf.posts||[]),{url,views:0,likes:0,clicks:0,conversions:0,revenue:0}]});
    setUrl("");
  };
  return <Card>
    <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
      <div style={{width:34,height:34,borderRadius:9,background:pc.color+"22",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,color:pc.color,flexShrink:0}}>{pc.icon}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap"}}>
          <span style={{fontWeight:700,fontSize:14}}>{inf.name}</span>
          <Tag color={tier?.color||C.sub}>{tier?.label}</Tag>
          <Tag color={INFL_STATUS[inf.status]||C.sub}>{inf.status}</Tag>
          {inf.totalRevenue>0&&<Tag color={C.emerald}>{fmtMoney(inf.totalRevenue)} driven</Tag>}
        </div>
        <div style={{fontSize:11,color:C.sub,marginTop:3}}>{fmt(inf.followers)} followers · {pc.label} · {inf.commission}% commission · Code: <strong style={{color:C.accent}}>{inf.promoCode}</strong></div>
      </div>
      <div style={{display:"flex",gap:6,flexShrink:0}}>
        {inf.totalRevenue>0&&!inf.paid&&<Btn small color={C.emerald} onClick={()=>onUpdate({...inf,paid:true})}>Mark Paid</Btn>}
        {inf.paid&&<Tag color={C.purple}>✓ Paid</Tag>}
        <button onClick={()=>setOpen(!open)} style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:6,color:C.sub,cursor:"pointer",padding:"3px 8px",fontSize:11}}>{open?"▲":"▼"}</button>
        <button onClick={()=>onDelete(inf.id)} style={{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:15,padding:0}}>×</button>
      </div>
    </div>
    {open&&<div style={{marginTop:14,paddingTop:14,borderTop:`1px solid ${C.border}`,display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        <Sel label="Status" value={inf.status} onChange={v=>onUpdate({...inf,status:v})} options={Object.keys(INFL_STATUS).map(k=>({value:k,label:k.charAt(0).toUpperCase()+k.slice(1)}))}/>
        <Inp label="Commission %" value={inf.commission} onChange={v=>onUpdate({...inf,commission:parseFloat(v)||0})}/>
        <Inp label="Contact" value={inf.contact||""} onChange={v=>onUpdate({...inf,contact:v})} placeholder="email@..."/>
      </div>
      <div style={{background:C.surface,borderRadius:10,padding:12}}>
        <div style={{fontSize:10,color:C.muted,marginBottom:8,textTransform:"uppercase",letterSpacing:1}}>Affiliate Details</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div><div style={{fontSize:10,color:C.muted}}>Promo Code</div><div style={{fontSize:15,fontWeight:700,color:C.accent,fontFamily:"monospace"}}>{inf.promoCode}</div></div>
          <div><div style={{fontSize:10,color:C.muted}}>Affiliate Link</div><div style={{fontSize:11,color:C.sky,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{inf.affiliateLink}</div></div>
        </div>
      </div>
      <div>
        <div style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Posts ({inf.posts?.length||0})</div>
        {inf.posts?.map((p,i)=>(
          <div key={i} style={{background:C.surface,borderRadius:8,padding:"9px 11px",marginBottom:6}}>
            <div style={{fontSize:12,color:C.sky,marginBottom:3,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.url}</div>
            <div style={{display:"flex",gap:14,fontSize:11,color:C.sub}}>
              <span>{fmt(p.views)} views</span><span>{fmt(p.clicks)} clicks</span><span>{p.conversions} sales</span><span style={{color:C.emerald}}>{fmtMoney(p.revenue)}</span>
            </div>
          </div>
        ))}
        <div style={{display:"flex",gap:8,marginTop:6}}>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste live post URL..."
            style={{flex:1,background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"7px 10px",color:C.text,fontSize:12,outline:"none"}}/>
          <Btn small onClick={addPost} disabled={!url.trim()}>Submit</Btn>
        </div>
      </div>
      {inf.posts?.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
        {[{l:"Views",v:fmt(totalV)},{l:"Clicks",v:fmt(totalC)},{l:"Revenue",v:fmtMoney(inf.totalRevenue)},{l:"Est Payout",v:fmtMoney(inf.totalRevenue*(inf.commission/100))}].map(s=>(
          <div key={s.l} style={{background:C.surface,borderRadius:8,padding:"8px 10px"}}>
            <div style={{fontSize:10,color:C.muted}}>{s.l}</div>
            <div style={{fontSize:14,fontWeight:700,fontFamily:"monospace"}}>{s.v}</div>
          </div>
        ))}
      </div>}
    </div>}
  </Card>;
}

function InfluencerTab({client,onUpdateClient}) {
  const [showAdd,setShowAdd]=useState(false);
  const [filter,setFilter]=useState("all");
  const [form,setForm]=useState({name:"",platform:"instagram",followers:"",tier:"micro",commission:10,contact:""});
  const [aiIdeas,setAiIdeas]=useState(""); const [aiLoading,setAiLoading]=useState(false);
  const infls=client.influencers||[];
  const filtered=filter==="all"?infls:infls.filter(i=>i.status===filter);
  const totalRev=infls.reduce((s,i)=>s+(i.totalRevenue||0),0);
  const totalConv=infls.reduce((s,i)=>s+(i.posts||[]).reduce((s2,p)=>s2+(p.conversions||0),0),0);
  const top=infls.length?[...infls].sort((a,b)=>(b.totalRevenue||0)-(a.totalRevenue||0))[0]:null;
  const add=()=>{
    const n={id:uid(),name:form.name,platform:form.platform,followers:parseInt(form.followers)||0,tier:form.tier,status:"outreach",commission:parseFloat(form.commission)||10,contact:form.contact,posts:[],totalRevenue:0,paid:false,promoCode:genCode(form.name),affiliateLink:genUTM(form.name)};
    onUpdateClient({...client,influencers:[...infls,n]});
    setForm({name:"",platform:"instagram",followers:"",tier:"micro",commission:10,contact:""});
    setShowAdd(false);
  };
  const upd=upd2=>onUpdateClient({...client,influencers:infls.map(i=>i.id===upd2.id?upd2:i)});
  const del=id=>onUpdateClient({...client,influencers:infls.filter(i=>i.id!==id)});
  const genAI=async()=>{
    setAiLoading(true);setAiIdeas("");
    const summary=infls.map(i=>`${i.name} (${INFL_TIER[i.tier]?.label} ${PLAT[i.platform]?.label}, ${fmt(i.followers)} followers): ${i.totalRevenue>0?fmtMoney(i.totalRevenue)+" revenue, "+i.posts?.length+" posts":"No posts yet"}`).join("\n");
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,messages:[{role:"user",content:`You are an influencer marketing strategist. Analyze this roster for ${client.name}:\n\n${summary||"No influencers yet"}\n\nProvide:\n1. 🏆 Who to scale budget with and why\n2. ⚠️ Who's underperforming\n3. 🎯 3 influencer profiles to recruit next\n4. 💡 2 campaign ideas\n5. 📊 Optimal commission structure\n\nBe specific and direct.`}]})});
      const j=await r.json();
      setAiIdeas(j.content?.find(b=>b.type==="text")?.text||"");
    }catch{setAiIdeas("Could not connect to AI.");}
    setAiLoading(false);
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <StatGrid stats={[
      {label:"Influencers",val:infls.length,color:C.accent},
      {label:"Revenue Driven",val:fmtMoney(totalRev),color:C.emerald},
      {label:"Conversions",val:totalConv,color:C.sky},
      {label:"Top Performer",val:top?.name||"—",color:C.gold},
    ]}/>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
      {["all","outreach","negotiating","contracted","posted","paid"].map(v=>(
        <button key={v} onClick={()=>setFilter(v)} style={{background:filter===v?C.accent:"transparent",border:`1px solid ${filter===v?C.accent:C.border}`,borderRadius:8,color:C.text,padding:"5px 12px",cursor:"pointer",fontSize:12,fontWeight:filter===v?700:400}}>
          {v.charAt(0).toUpperCase()+v.slice(1)}
        </button>
      ))}
      <div style={{marginLeft:"auto",display:"flex",gap:8}}>
        <Btn small outline onClick={genAI}>{aiLoading?"Thinking...":"✦ AI Recs"}</Btn>
        <Btn small onClick={()=>setShowAdd(!showAdd)}>+ Add</Btn>
      </div>
    </div>
    {showAdd&&<Card>
      <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>New Influencer</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10}}>
        <Inp label="Name / Handle" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} placeholder="@handle"/>
        <Sel label="Platform" value={form.platform} onChange={v=>setForm(f=>({...f,platform:v}))} options={Object.entries(PLAT).map(([k,v2])=>({value:k,label:v2.label}))}/>
        <Sel label="Tier" value={form.tier} onChange={v=>setForm(f=>({...f,tier:v}))} options={Object.entries(INFL_TIER).map(([k,v2])=>({value:k,label:`${v2.label} (${v2.range})`}))}/>
        <Inp label="Followers" value={form.followers} onChange={v=>setForm(f=>({...f,followers:v}))} placeholder="84000"/>
        <Inp label="Commission %" value={form.commission} onChange={v=>setForm(f=>({...f,commission:v}))} placeholder="10"/>
        <Inp label="Contact Email" value={form.contact} onChange={v=>setForm(f=>({...f,contact:v}))} placeholder="email@..."/>
      </div>
      <div style={{display:"flex",gap:8}}>
        <Btn onClick={add} disabled={!form.name.trim()}>Add to Roster</Btn>
        <Btn outline onClick={()=>setShowAdd(false)}>Cancel</Btn>
      </div>
    </Card>}
    {aiIdeas&&<Card accent={C.accent}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:700}}>✦ AI Influencer Strategy</div>
        <Btn small outline onClick={()=>setAiIdeas("")}>Close</Btn>
      </div>
      <div style={{fontSize:13,lineHeight:1.9,whiteSpace:"pre-wrap"}}>{aiIdeas}</div>
    </Card>}
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {filtered.map(inf=><InfluencerRow key={inf.id} inf={inf} onUpdate={upd} onDelete={del}/>)}
      {!filtered.length&&<Card style={{textAlign:"center",padding:32}}>
        <div style={{color:C.muted,fontSize:13,marginBottom:12}}>No influencers in this status</div>
        <Btn small onClick={()=>setShowAdd(true)}>+ Add First Influencer</Btn>
      </Card>}
    </div>
  </div>;
}

function CalendarTab({client,onUpdateClient}) {
  const [showAdd,setShowAdd]=useState(false);
  const [filter,setFilter]=useState("all");
  const [form,setForm]=useState({title:"",platform:"youtube",date:dayOff(3),time:"10:00",status:"idea",notes:""});
  const cal=client.calendar||[];
  const add=()=>{ onUpdateClient({...client,calendar:[...cal,{...form,id:uid()}]}); setForm({title:"",platform:"youtube",date:dayOff(3),time:"10:00",status:"idea",notes:""}); setShowAdd(false); };
  const upd=ev=>onUpdateClient({...client,calendar:cal.map(e=>e.id===ev.id?ev:e)});
  const del=id=>onUpdateClient({...client,calendar:cal.filter(e=>e.id!==id)});
  const pushGCal=ev=>{ const s=ev.date.replace(/-/g,"")+"T"+ev.time.replace(":","")+"00"; window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`[${PLAT[ev.platform]?.short}] ${ev.title}`)}&dates=${s}/${s}`,"_blank"); };
  const items=cal.filter(e=>filter==="all"||e.status===filter).sort((a,b)=>a.date.localeCompare(b.date));
  const grouped=items.reduce((acc,ev)=>{ const k=daysUntil(ev.date)<0?"Overdue":daysUntil(ev.date)===0?"Today":daysUntil(ev.date)<=7?"This Week":"Upcoming"; if(!acc[k])acc[k]=[]; acc[k].push(ev); return acc; },{});
  const STATUS_COLORS={idea:C.muted,scripting:C.amber,filming:C.gold,editing:C.accent,scheduled:C.emerald,posted:C.muted};
  const pending=cal.filter(e=>e.status!=="posted");
  const overdue=cal.filter(e=>daysUntil(e.date)<0&&e.status!=="posted");
  const week=cal.filter(e=>daysUntil(e.date)>=0&&daysUntil(e.date)<=7&&e.status!=="posted");
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <StatGrid stats={[{label:"Total",val:cal.length,color:C.accent},{label:"Pending",val:pending.length,color:C.amber},{label:"This Week",val:week.length,color:C.gold},{label:"Overdue",val:overdue.length,color:overdue.length?C.rose:C.emerald}]}/>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
      {["all","idea","scripting","filming","editing","scheduled","posted"].map(v=>(
        <button key={v} onClick={()=>setFilter(v)} style={{background:filter===v?C.accent:"transparent",border:`1px solid ${filter===v?C.accent:C.border}`,borderRadius:8,color:C.text,padding:"5px 12px",cursor:"pointer",fontSize:12,fontWeight:filter===v?700:400}}>{v.charAt(0).toUpperCase()+v.slice(1)}</button>
      ))}
      <div style={{marginLeft:"auto"}}><Btn onClick={()=>setShowAdd(!showAdd)}>+ Add Content</Btn></div>
    </div>
    {showAdd&&<Card>
      <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>New Content Item</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:10}}>
        <div style={{gridColumn:"1/-1"}}><Inp label="Title" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} placeholder="Video or post title..."/></div>
        <Sel label="Platform" value={form.platform} onChange={v=>setForm(f=>({...f,platform:v}))} options={Object.entries(PLAT).map(([k,v2])=>({value:k,label:v2.label}))}/>
        <Sel label="Status" value={form.status} onChange={v=>setForm(f=>({...f,status:v}))} options={["idea","scripting","filming","editing","scheduled"].map(k=>({value:k,label:k.charAt(0).toUpperCase()+k.slice(1)}))}/>
        <Inp label="Notes" value={form.notes} onChange={v=>setForm(f=>({...f,notes:v}))} placeholder="Optional..."/>
        <Inp label="Date" type="date" value={form.date} onChange={v=>setForm(f=>({...f,date:v}))}/>
        <Inp label="Time" type="time" value={form.time} onChange={v=>setForm(f=>({...f,time:v}))}/>
      </div>
      <div style={{display:"flex",gap:8}}><Btn onClick={add} disabled={!form.title.trim()}>Add</Btn><Btn outline onClick={()=>setShowAdd(false)}>Cancel</Btn></div>
    </Card>}
    {["Overdue","Today","This Week","Upcoming"].map(group=>{
      const evs=grouped[group]; if(!evs?.length) return null;
      return <div key={group}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
          <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:group==="Overdue"?C.rose:group==="Today"?C.gold:C.sub}}>{group}</div>
          <div style={{flex:1,height:1,background:C.border}}/>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {evs.map(ev=>{
            const pc=PLAT[ev.platform];
            return <Card key={ev.id} style={{padding:"11px 14px"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:26,height:26,borderRadius:7,background:pc?.color+"22",display:"flex",alignItems:"center",justifyContent:"center",color:pc?.color,fontSize:12,flexShrink:0}}>{pc?.icon}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{ev.title}</div>
                  <div style={{display:"flex",gap:8,marginTop:3}}>
                    <span style={{background:(STATUS_COLORS[ev.status]||C.muted)+"22",color:STATUS_COLORS[ev.status]||C.muted,fontSize:10,fontWeight:700,borderRadius:20,padding:"1px 7px"}}>{ev.status}</span>
                    <span style={{fontSize:10,color:C.sub}}>{fmtDate(ev.date)} · {ev.time}</span>
                  </div>
                </div>
                <div style={{display:"flex",gap:6,flexShrink:0}}>
                  <Btn small color={C.gcal} onClick={()=>pushGCal(ev)}>📅 GCal</Btn>
                  {ev.status!=="posted"&&<Btn small color={C.emerald} onClick={()=>upd({...ev,status:"posted"})}>✓ Done</Btn>}
                  <button onClick={()=>del(ev.id)} style={{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:14,padding:0}}>×</button>
                </div>
              </div>
            </Card>;
          })}
        </div>
      </div>;
    })}
  </div>;
}

function StrategyTab({client}) {
  const [strategy,setStrategy]=useState(""); const [loading,setLoading]=useState(false); const [err,setErr]=useState("");
  const gen=async()=>{
    setLoading(true);setErr("");setStrategy("");
    const social=Object.entries(client.social||{}).filter(([,v])=>v.connected).map(([p,d])=>`${PLAT[p].label}: ${fmt(d.followers)} followers, +${d.growth}%/mo`).join(", ");
    const ecom=Object.entries(client.ecommerce||{}).filter(([,v])=>v.connected).map(([p,d])=>`${ECOM[p].label}: ${fmtMoney(d.revenue)} revenue`).join(", ");
    const ads=Object.entries(client.ads||{}).filter(([,v])=>v.connected).map(([p,d])=>`${ADS[p].label}: ${fmtMoney(d.spend)} spend, ${d.roas}x ROAS`).join(", ");
    const email=Object.entries(client.email||{}).filter(([,v])=>v.connected).map(([p,d])=>`${EMAIL[p].label}: ${fmt(d.subscribers)} subs, ${d.openRate}% open rate`).join(", ");
    const infls=`${client.influencers?.length||0} influencers, ${fmtMoney(client.influencers?.reduce((s,i)=>s+(i.totalRevenue||0),0)||0)} driven`;
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1200,messages:[{role:"user",content:`You are an elite full-funnel digital marketing strategist. Analyze ALL channels for ${client.name}:\n\nSOCIAL: ${social||"none"}\nECOMMERCE: ${ecom||"none"}\nADS: ${ads||"none"}\nEMAIL: ${email||"none"}\nINFLUENCERS: ${infls}\n\nDeliver:\n1. 🎯 Top 3 highest-ROI opportunities\n2. 🎬 5 specific content ideas with titles\n3. 📢 Ad optimization recommendations\n4. 🤝 Influencer strategy\n5. 📧 Email/retention play\n6. 📅 90-day growth roadmap\n7. ⛔ What to stop immediately\n\nBe specific, data-driven, direct.`}]})});
      const j=await r.json();
      setStrategy(j.content?.find(b=>b.type==="text")?.text||"");
    }catch{setErr("Could not connect to AI.");}
    setLoading(false);
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    {!strategy&&!loading&&<Card style={{textAlign:"center",padding:36}}>
      <div style={{fontSize:36,marginBottom:10}}>✦</div>
      <div style={{fontSize:17,fontWeight:700,marginBottom:6}}>Full-Funnel AI Strategy</div>
      <div style={{color:C.sub,fontSize:13,marginBottom:20}}>Analyzes all channels for {client.name}.</div>
      <Btn onClick={gen}>Generate Strategy</Btn>
    </Card>}
    {loading&&<Card style={{textAlign:"center",padding:40}}><div style={{fontSize:24,marginBottom:10}}>◌</div><div style={{color:C.sub}}>Analyzing all channels...</div></Card>}
    {err&&<Card accent={C.rose}><div style={{color:C.rose,fontSize:13}}>{err}</div></Card>}
    {strategy&&<Card accent={C.accent}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
        <div style={{fontSize:14,fontWeight:700}}>✦ Strategy — {client.name}</div>
        <Btn small outline onClick={gen}>Regenerate</Btn>
      </div>
      <div style={{fontSize:13,lineHeight:2,whiteSpace:"pre-wrap"}}>{strategy}</div>
    </Card>}
  </div>;
}

function ReportingTab({client,onUpdateClient}) {
  const [ghlKey,setGhlKey]=useState(""); const [ghlContact,setGhlContact]=useState(client.ghlContactId||"");
  const [slackToken,setSlackToken]=useState(""); const [slackChannel,setSlackChannel]=useState(client.slackChannel||"");
  const [status,setStatus]=useState("");
  const buildReport=()=>{
    const lines=[`╔══════════════════════════════╗`,` 📊 MONTHLY REPORT — ${client.name}`,` ${new Date().toLocaleDateString()}`,`╚══════════════════════════════╝`,""];
    const social=Object.entries(client.social||{}).filter(([,v])=>v.connected);
    if(social.length){ lines.push("📱 SOCIAL"); social.forEach(([p,d])=>lines.push(`  ${PLAT[p].label}: ${fmt(d.followers)} (+${d.growth}%/mo) · ${fmt(d.views)} views`)); lines.push(""); }
    const ecom=Object.entries(client.ecommerce||{}).filter(([,v])=>v.connected);
    if(ecom.length){ lines.push("🛍 ECOMMERCE"); ecom.forEach(([p,d])=>lines.push(`  ${ECOM[p].label}: ${fmtMoney(d.revenue)} · ${fmt(d.orders)} orders`)); lines.push(""); }
    const ads=Object.entries(client.ads||{}).filter(([,v])=>v.connected);
    if(ads.length){ lines.push("📢 ADS"); ads.forEach(([p,d])=>lines.push(`  ${ADS[p].label}: ${fmtMoney(d.spend)} spend · ${d.roas}x ROAS`)); lines.push(""); }
    const infls=client.influencers||[];
    if(infls.length){ lines.push("🤝 INFLUENCERS"); lines.push(`  ${infls.length} active · ${fmtMoney(infls.reduce((s,i)=>s+(i.totalRevenue||0),0))} revenue driven`); lines.push(""); }
    const pending=(client.calendar||[]).filter(e=>e.status!=="posted");
    if(pending.length){ lines.push("📅 UPCOMING"); pending.slice(0,5).forEach(e=>lines.push(`  ${fmtDate(e.date)} [${PLAT[e.platform]?.short}] ${e.title}`)); }
    return lines.join("\n");
  };
  const pushGHL=async()=>{
    if(!ghlKey||!ghlContact){setStatus("⚠ Enter API key and Contact ID");return;}
    setStatus("Pushing...");
    try{
      const r=await fetch(`https://services.leadconnectorhq.com/contacts/${ghlContact}/notes`,{method:"POST",headers:{"Authorization":`Bearer ${ghlKey}`,"Content-Type":"application/json","Version":"2021-07-28"},body:JSON.stringify({body:buildReport()})});
      setStatus(r.ok?"✅ Pushed to GHL!":"❌ Error: "+r.status);
    }catch{setStatus("❌ Network error");}
  };
  const sendSlack=async()=>{
    if(!slackToken||!slackChannel){setStatus("⚠ Enter token & channel");return;}
    setStatus("Sending...");
    try{
      const r=await fetch("https://slack.com/api/chat.postMessage",{method:"POST",headers:{"Authorization":`Bearer ${slackToken}`,"Content-Type":"application/json"},body:JSON.stringify({channel:slackChannel,text:"```"+buildReport()+"```"})});
      const j=await r.json();
      setStatus(j.ok?"✅ Sent to Slack!":"❌ "+j.error);
    }catch{setStatus("❌ Network error");}
  };
  const exportData=()=>{
    const blob=new Blob([JSON.stringify(client,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download=`${client.name.replace(/\s/g,"_")}.json`;a.click();
  };
  return <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <Card>
      <div style={{fontSize:13,fontWeight:700,marginBottom:12}}>📄 Monthly Report</div>
      <pre style={{fontSize:11,color:C.text,lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"monospace",background:C.surface,borderRadius:10,padding:14,maxHeight:260,overflow:"auto",margin:0}}>{buildReport()}</pre>
      <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap",alignItems:"center"}}>
        <Btn onClick={()=>{navigator.clipboard?.writeText(buildReport());setStatus("✅ Copied!");}}>Copy Report</Btn>
        {status&&<span style={{fontSize:12,color:status.startsWith("✅")?C.emerald:C.rose}}>{status}</span>}
      </div>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
      <Card accent={C.ghl}>
        <div style={{fontSize:13,fontWeight:700,color:C.ghl,marginBottom:12}}>⚡ GoHighLevel</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Inp label="GHL API Key" type="password" value={ghlKey} onChange={setGhlKey} placeholder="eyJ..."/>
          <Inp label="Contact ID" value={ghlContact} onChange={v=>{setGhlContact(v);onUpdateClient({...client,ghlContactId:v});}} placeholder="abc123..."/>
          <Btn color={C.ghl} onClick={pushGHL}>⚡ Push to GHL</Btn>
        </div>
        <div style={{fontSize:11,color:C.muted,marginTop:10}}>GHL → Settings → API Keys</div>
      </Card>
      <Card accent={C.slack}>
        <div style={{fontSize:13,fontWeight:700,color:C.slack,marginBottom:12}}>💬 Slack</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <Inp label="Bot Token" type="password" value={slackToken} onChange={setSlackToken} placeholder="xoxb-..."/>
          <Inp label="Channel" value={slackChannel} onChange={v=>{setSlackChannel(v);onUpdateClient({...client,slackChannel:v});}} placeholder="#reports"/>
          <Btn color={C.slack} onClick={sendSlack}>💬 Send to Slack</Btn>
        </div>
        <div style={{fontSize:11,color:C.muted,marginTop:10}}>api.slack.com → create bot → chat:write scope</div>
      </Card>
    </div>
    <Card accent={C.accent}>
      <div style={{fontSize:13,fontWeight:700,marginBottom:6}}>💾 Export Data</div>
      <div style={{fontSize:12,color:C.sub,marginBottom:12}}>Export all client data as JSON for Supabase migration later.</div>
      <Btn onClick={exportData}>⬇ Export {client.name} (JSON)</Btn>
    </Card>
  </div>;
}

function AddClientModal({onAdd,onClose}) {
  const [name,setName]=useState(""); const [demo,setDemo]=useState(true);
  const COLORS=[C.emerald,C.accent,C.purple,C.gold,C.sky,C.rose,C.amber];
  const blank=n=>({id:uid(),name:n,color:COLORS[Math.floor(Math.random()*COLORS.length)],ghlContactId:"",slackChannel:"",reportEmail:"",
    social:Object.fromEntries(Object.keys(PLAT).map(p=>[p,{connected:false,followers:0,growth:0,views:0,videos:[],trend:[]}])),
    ecommerce:Object.fromEntries(Object.keys(ECOM).map(p=>[p,{connected:false}])),
    ads:Object.fromEntries(Object.keys(ADS).map(p=>[p,{connected:false}])),
    email:Object.fromEntries(Object.keys(EMAIL).map(p=>[p,{connected:false}])),
    influencers:[],calendar:[]});
  const demoify=c=>{
    const f=Math.floor; const r=Math.random;
    c.social.youtube={connected:true,followers:f(r()*60000+5000),growth:+(r()*5+1).toFixed(1),views:f(r()*2e6+2e5),videos:[{title:"Top Tips",views:f(r()*1e5+1e4),likes:3000,comments:150,eng:5.4}],trend:[5,7,9,12,15,18,21,24]};
    c.social.instagram={connected:true,followers:f(r()*40000+3000),growth:+(r()*8+2).toFixed(1),views:f(r()*1e6+1e5),videos:[{title:"Reel Hit",views:f(r()*8e4+5000),likes:4000,comments:200,eng:7.2}],trend:[3,5,7,9,12,15,18,20]};
    c.ecommerce.shopify={connected:true,revenue:f(r()*1e5+2e4),orders:f(r()*2000+400),aov:+(r()*40+25).toFixed(1),topProducts:[{name:"Best Seller",sales:280,revenue:11200}],trend:[4,5,6.5,8,9.5,11,12,14].map(v=>v*1000)};
    c.ads.meta={connected:true,spend:f(r()*5000+1000),revenue:f(r()*2e4+5000),roas:+(r()*4+2).toFixed(2),clicks:f(r()*1e4+2000),impressions:f(r()*3e5+5e4),ctr:+(r()*3+1).toFixed(2),campaigns:[{name:"Main Campaign",spend:2000,revenue:9000,roas:4.5}]};
    c.calendar=[{id:uid(),title:"Weekly Content",platform:"instagram",date:dayOff(3),time:"10:00",status:"idea",notes:""}];
    return c;
  };
  return <div style={{position:"fixed",inset:0,background:"#000c",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300}}>
    <div style={{background:C.surface,border:`1px solid ${C.borderHi}`,borderRadius:16,padding:28,width:380,display:"flex",flexDirection:"column",gap:14}}>
      <div style={{fontSize:17,fontWeight:800}}>Add New Client</div>
      <Inp label="Client / Brand Name" value={name} onChange={setName} placeholder="e.g. Apex Fitness"/>
      <label style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",fontSize:13,color:C.sub}}>
        <input type="checkbox" checked={demo} onChange={e=>setDemo(e.target.checked)} style={{accentColor:C.accent}}/>Pre-fill with demo data
      </label>
      <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}>
        <Btn outline onClick={onClose}>Cancel</Btn>
        <Btn disabled={!name.trim()} onClick={()=>{const c=blank(name.trim());onAdd(demo?demoify(c):c);onClose();}}>Add Client</Btn>
      </div>
    </div>
  </div>;
}

const TABS=[
  {id:"social",      label:"📱 Social"},
  {id:"ecommerce",   label:"🛍 Store"},
  {id:"ads",         label:"📢 Ads"},
  {id:"email",       label:"📧 Email"},
  {id:"influencers", label:"🤝 Influencers"},
  {id:"calendar",    label:"📅 Calendar"},
  {id:"strategy",    label:"✦ Strategy"},
  {id:"reporting",   label:"📄 Reports"},
];

function Dashboard() {
  const [clients,setClients]=useState(DEMO);
  const [activeId,setActiveId]=useState(DEMO[0].id);
  const [tab,setTab]=useState("social");
  const [showAdd,setShowAdd]=useState(false);
  const [sidebar,setSidebar]=useState(true);
  const client=clients.find(c=>c.id===activeId)||clients[0];
  const updClient=u=>setClients(cs=>cs.map(c=>c.id===u.id?u:c));
  const delClient=id=>{ const r=clients.filter(c=>c.id!==id); setClients(r); if(activeId===id&&r.length) setActiveId(r[0].id); };
  const exportAll=()=>{
    const blob=new Blob([JSON.stringify(clients,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");a.href=url;a.download="agency_os_export.json";a.click();
  };
  return <div style={{display:"flex",height:"100vh",background:C.bg,color:C.text,fontFamily:"'Outfit',sans-serif",overflow:"hidden"}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
      *{box-sizing:border-box;margin:0;padding:0;}
      ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:${C.bg};}::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px;}
      button:hover{filter:brightness(1.1);}select option{background:${C.surface};}
    `}</style>
    {sidebar&&<div style={{width:238,background:C.surface,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
      <div style={{padding:"15px 16px 12px",borderBottom:`1px solid ${C.border}`,display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:27,height:27,background:`linear-gradient(135deg,${C.accent},${C.purple})`,borderRadius:8,flexShrink:0}}/>
        <div>
          <div style={{fontWeight:800,fontSize:14,letterSpacing:-.3}}>AgencyOS</div>
          <div style={{fontSize:9,color:C.muted,letterSpacing:.8,textTransform:"uppercase"}}>Full Command Center</div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"12px 10px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,padding:"0 3px"}}>
          <span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:1}}>Clients</span>
          <button onClick={()=>setShowAdd(true)} style={{background:C.accent,border:"none",borderRadius:6,color:"#fff",width:20,height:20,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>+</button>
        </div>
        {clients.map(c=>{
          const sc=Object.entries(c.social||{}).filter(([,v])=>v.connected);
          const ec=Object.entries(c.ecommerce||{}).filter(([,v])=>v.connected);
          const totalF=sc.reduce((s,[,v])=>s+(v.followers||0),0);
          const totalR=ec.reduce((s,[,v])=>s+(v.revenue||0),0);
          const pend=(c.calendar||[]).filter(e=>e.status!=="posted").length;
          const isA=c.id===activeId;
          return <div key={c.id} onClick={()=>setActiveId(c.id)} style={{background:isA?C.accentLo:"transparent",border:`1px solid ${isA?C.accentMid:C.border}`,borderRadius:10,padding:"10px 11px",cursor:"pointer",marginBottom:5,transition:"all .15s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <div style={{width:7,height:7,borderRadius:"50%",background:c.color,flexShrink:0}}/>
                  <div style={{fontWeight:600,fontSize:13,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.name}</div>
                </div>
                <div style={{fontSize:10,color:C.muted,marginTop:2,paddingLeft:13}}>{fmt(totalF)} reach · {fmtMoney(totalR)}</div>
              </div>
              <div style={{display:"flex",gap:4,alignItems:"center",flexShrink:0}}>
                {pend>0&&<span style={{background:C.amberLo,color:C.amber,borderRadius:20,padding:"1px 5px",fontSize:9,fontWeight:700}}>{pend}</span>}
                <button onClick={e=>{e.stopPropagation();delClient(c.id);}} style={{background:"transparent",border:"none",color:C.muted,cursor:"pointer",fontSize:13,padding:0}}>×</button>
              </div>
            </div>
            <div style={{display:"flex",gap:3,marginTop:7,flexWrap:"wrap"}}>
              {sc.map(([p])=><span key={p} style={{background:PLAT[p].color+"22",color:PLAT[p].color,borderRadius:4,padding:"1px 5px",fontSize:9,fontWeight:700}}>{PLAT[p].short}</span>)}
              {ec.map(([p])=><span key={p} style={{background:ECOM[p].color+"22",color:ECOM[p].color,borderRadius:4,padding:"1px 5px",fontSize:9,fontWeight:700}}>{ECOM[p].label.slice(0,4)}</span>)}
            </div>
          </div>;
        })}
      </div>
      <div style={{padding:"10px 12px",borderTop:`1px solid ${C.border}`}}>
        <button onClick={exportAll} style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:8,color:C.sub,padding:"7px 12px",cursor:"pointer",fontSize:11,width:"100%"}}>💾 Export All Data (JSON)</button>
      </div>
    </div>}
    <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"0 18px",display:"flex",alignItems:"center",gap:12,height:52,flexShrink:0,overflowX:"auto"}}>
        <button onClick={()=>setSidebar(!sidebar)} style={{background:"transparent",border:"none",color:C.sub,cursor:"pointer",fontSize:18,padding:0,flexShrink:0}}>☰</button>
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:client?.color}}/>
          <span style={{fontWeight:700,fontSize:14}}>{client?.name}</span>
          {(client?.calendar||[]).filter(e=>daysUntil(e.date)===0&&e.status!=="posted").length>0&&
            <span style={{background:C.goldLo,color:C.gold,border:`1px solid ${C.gold}44`,borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700}}>📅 Due today</span>}
        </div>
        <div style={{display:"flex",gap:3,marginLeft:"auto",flexShrink:0,alignItems:"center"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{background:tab===t.id?C.accentLo:"transparent",border:`1px solid ${tab===t.id?C.accentMid:C.border}`,borderRadius:8,color:tab===t.id?C.accent:C.sub,padding:"5px 10px",cursor:"pointer",fontSize:11,fontWeight:tab===t.id?700:400,whiteSpace:"nowrap"}}>
              {t.label}
            </button>
          ))}
          {/* Clerk user button — shows avatar + sign out */}
          <div style={{marginLeft:8}}>
            <UserButton afterSignOutUrl="/"/>
          </div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:20}}>
        {client&&tab==="social"&&      <SocialTab      client={client}/>}
        {client&&tab==="ecommerce"&&   <EcomTab        client={client}/>}
        {client&&tab==="ads"&&         <AdsTab         client={client}/>}
        {client&&tab==="email"&&       <EmailTab       client={client}/>}
        {client&&tab==="influencers"&& <InfluencerTab  client={client} onUpdateClient={updClient}/>}
        {client&&tab==="calendar"&&    <CalendarTab    client={client} onUpdateClient={updClient}/>}
        {client&&tab==="strategy"&&    <StrategyTab    client={client}/>}
        {client&&tab==="reporting"&&   <ReportingTab   client={client} onUpdateClient={updClient}/>}
      </div>
    </div>
    {showAdd&&<AddClientModal onAdd={c=>{setClients(cs=>[...cs,c]);setActiveId(c.id);}} onClose={()=>setShowAdd(false)}/>}
  </div>;
}

export default function AgencyOS() {
  return <>
    <SignedOut>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:"#060609",flexDirection:"column",gap:24}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
          <div style={{width:36,height:36,background:"linear-gradient(135deg,#7b6fff,#c084fc)",borderRadius:10}}/>
          <div>
            <div style={{fontWeight:800,fontSize:20,color:"#e6e6f8",letterSpacing:-.3}}>AgencyOS</div>
            <div style={{fontSize:10,color:"#3a3a52",letterSpacing:.8,textTransform:"uppercase"}}>Full Command Center</div>
          </div>
        </div>
        <SignIn routing="hash"/>
      </div>
    </SignedOut>
    <SignedIn>
      <Dashboard/>
    </SignedIn>
  </>;
}

