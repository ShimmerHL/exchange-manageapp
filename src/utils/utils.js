let ServeUrl = "http://localhost:3000"


let tableDataAlterFun = (context, res) => {  //tableData请求到的数据修改
    let NewData = [];
    res.data.forEach((item, index) => {

        let StateTransitionText = item.Exist ? "已删除" : "未删除"
        NewData.push({
            id: index + 1,
            GiftUnique: item.GiftUnique,
            CommodityName: item.CommodityName,
            Registration: item.Registration,
            Exist: StateTransitionText,
            Edit: false,
        })
    })
    context.$store.commit("tableDataAlter", NewData)

}
let fromDataAlterFun = (context, res) => {  //formData请求到的数据修改
    let DataArr = res.data;
    for (let i = 0; i < DataArr.length; i++) {
        DataArr[i].CarouselPictures.forEach((item) => {
            if (item.CarouselPicturesUrl !== " ") {
                item.CarouselPicturesUrl =
                    ServeUrl + item.CarouselPicturesUrl; //添加域名
            } else {
                item.CarouselPicturesUrl = ""; //避免带有空格被渲染
            }
        });
        DataArr[i].Specification.forEach((item) => {
            if (item.SpecificationText == " ") {
                item.SpecificationText = ""; //避免带有空格被渲染
            }
        });
        DataArr[i].IntroduceImg.forEach((item) => {
            if (item.IntroduceImgUrl !== " ") {
                item.IntroduceImgUrl = ServeUrl + item.IntroduceImgUrl; //添加域名
            } else {
                item.IntroduceImgUrl = ""; //避免带有空格被渲染
            }
        })
    }

    context.$store.commit("formDataAlter", DataArr)
}

let UsertableDataAlterFun = (context, res) => {  //UsertableData请求到的数据修改
    let NewData = [];
    res.data.forEach((item, index) => {
        NewData.push({
            id: index + 1,
            Useropenid: item.Useropenid,
            UserName: item.UserName,
            Phone: item.Phone,
            Edit: false,
        })
    })
    context.$store.commit("UsertableDataAlter", NewData)
}
let UserfromDataAlterFun = (context, res) => {  //UserformData请求到的数据修改
    let DataArr = res.data;

    DataArr.forEach(item => {
        //由于mysql时区比会慢8小时所以在这直接修改加一天(mysql时区怎么改都不变的傻办法)
        let TimeAlter = item.DateBirth.substring(0, 10).split("-")
        TimeAlter[2] = TimeAlter[2] <= 9 ? "0" + (parseInt(TimeAlter[2]) + 1) : parseInt(TimeAlter[2]) + 1
        item.DateBirth = TimeAlter.join("-")
    })
    context.$store.commit("UserformDataAlter", DataArr)
}

let EnterprisetableDataAlterFun = (context, res) => {  //EnterprisetableData请求到的数据修改
    let NewData = [];
    res.data.forEach((item, index) => {
        NewData.push({
            id: index + 1,
            Registration: item.Registration,
            Password: item.Password,
            Edit: false,
        })
    })
    context.$store.commit("EnterprisetableDataAlter", NewData)
}
let EnterprisefromDataAlterFun = (context, res) => {  // EnterpriseformData请求到的数据修改
    let DataArr = res.data;

    context.$store.commit("EnterpriseformDataAlter", DataArr)
}

let CustomQuerytableDataAlterFun = (context, res) => {  // CustomQuerytableData请求到的数据修改
    let NewData = [];
    res.data.forEach((item, index) => {
        let StateTransitionText = item.Exist ? "已删除" : "未删除"
        NewData.push({
            id: index + 1,
            GiftUnique: item.GiftUnique,
            CommodityName: item.CommodityName,
            Registration: item.Registration,
            Exist: StateTransitionText,
            Edit: false,
        })
    }) 
    context.$store.commit("CustomQuerytableDataAlter", NewData)
}
let CustomQueryfromDataAlterFun = (context, res) => {  //  CustomQueryformData请求到的数据修改
    let DataArr = res.data;

    for (let i = 0; i < DataArr.length; i++) {
        DataArr[i].CarouselPictures.forEach((item) => {
            if (item.CarouselPicturesUrl !== " ") {
                item.CarouselPicturesUrl =
                    ServeUrl + item.CarouselPicturesUrl; //添加域名
            } else {
                item.CarouselPicturesUrl = ""; //避免带有空格被渲染
            }
        });
        DataArr[i].Specification.forEach((item) => {
            if (item.SpecificationText == " ") {
                item.SpecificationText = ""; //避免带有空格被渲染
            }
        });
        DataArr[i].IntroduceImg.forEach((item) => {
            if (item.IntroduceImgUrl !== " ") {
                item.IntroduceImgUrl = ServeUrl + item.IntroduceImgUrl; //添加域名
            } else {
                item.IntroduceImgUrl = ""; //避免带有空格被渲染
            }
        })
    }

    context.$store.commit("CustomQueryformDataAlter", DataArr)
}

module.exports = {
    ServeUrl, 
    fromDataAlterFun, tableDataAlterFun, 
    UsertableDataAlterFun, UserfromDataAlterFun,
    EnterprisetableDataAlterFun,EnterprisefromDataAlterFun,
    CustomQuerytableDataAlterFun,CustomQueryfromDataAlterFun
}