import router from "./router"
import store from "./store"
import { GetCookie,RemoveCookie } from "./utils/auth"

const whiteList=['/login','/']
let refresh=false
router.beforeEach((to,from,next)=>{
    const token=GetCookie()
    if(token){
        if(to.path === '/'){
            next()
        }else{
            if(!store.permmited){
                store.dispatch("GetUserInfoAction", token).then(() => {
                    //授权为真
                    console.log(from.path)
                    if(!refresh){
                        //不知道为什么，刷新页面之后一定要push一下asyncroute的内容才能正常显示，算了，有句话叫做代码能跑就别动它
                        router.push(to.path)
                        refresh=true
                    }
                    next()
                }).catch((err) => {
                    //授权为假
                    console.log(err)
                    RemoveCookie()
                    next('/login')
                })
            }else{
                //授权过了
                next()
            }
        }
    }else{
        if(whiteList.indexOf(to.path)>=0){
            next()
        }else{
            next('/login')
        }
    }
})