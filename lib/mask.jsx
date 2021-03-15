export default class Mask {
    static date(value) {
        value = value.replace(/[^\/0-9]/g, '');
        value = value.replace(/D/g, "");
        value = value.replace(/^(\d\d)(\d)/, "$1/$2");
        value = value.replace(/^(\d{2}\/\d{2})(\d)/, "$1/$2");
        return value.slice(0, 10);
    }
}