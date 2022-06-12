import Reject from "./Reject"

export default class Download {

    static csv(url,filename,method = "GET"){
        return this.download(url,filename,'text/csv',method);
    }

    static html(url,filename,method = "GET"){
        return this.download(url,filename,'text/html',method);
    }

    static pdf(url,filename,method = "GET"){
        return this.download(url,filename,'application/pdf',method);
    }

    static xlsx(url,filename,method = "GET"){
        return this.download(url,filename,'application/vnd.ms-excel',method);
    }

    static excel(url,filename,method = "GET"){
        return this.download(url,filename,'application/vnd.ms-excel',method);
    }

    static download(url,filename,type,method = "GET"){
        return new Promise((resolve, reject) => {
            axios({
                url: url,
                method: method,
                responseType: 'blob',
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data],{ type: type }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download',filename); 
                document.body.appendChild(link);
                link.click();
                resolve(response.data);
            }).catch(error => {

                let rejectable = new Reject(error,this.errors);
                rejectable.setMessage("Could Not Download");

                reject(rejectable);
            });

        });
        
    }
}
