const validation = {
    isEmpty(val) {
        if (val === "") {
            return true
        }
    },
    hasNoSlashes(val) {
        if (val.indexOf("/") === - 1) {
            return true
        }
    },
    isInvalidYear(val){
        if (isNaN(val)) {
            return true
        }
    },
    isInvalidDate(val){
        if (val.toString() === "Invalid Date") {
            return true
        }
    }

}