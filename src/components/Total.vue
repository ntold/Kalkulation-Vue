<template>
    <div class="content">
        <div class="content-wrap">
            <div class="total-title">
                <div class="title-head">Bezeichnung</div>
                <div class="title-head">Zeichen Nr.</div>
                <div class="title-head">Losgrösse</div>
                <div class="title-head">Datum</div>
                <div class="title-head">Visum</div>
                <div class="title-item">JS_INPUT</div>
                <div class="title-item">JS_INPUT</div>
                <div class="title-item">JS_INPUT</div>
                <div class="title-item">JS_INPUT</div>
                <div class="title-item">JS_INPUT</div>
            </div>
            <div class="content-page">
                <div>
                    <!-- Title -->
                    <div>Fertigungslohnkosten</div>
                    <div>Fertigungsgemeinkosten ( 10% )</div>
                    <div>Fertigungskosten</div>
                </div>
                <div>
                    <!-- Values -->
                    <div class="content-page-value">JS_INPUT</div>
                    <div class="content-page-value">JS_INPUT</div>
                    
                </div>

                <div class="content-page-value">JS_INPUT</div>

                <div>
                    <!-- Title -->
                    <div>Materialeinzelkosten</div>
                    <div>Materialgemainkosten</div>
                    <div>Materialkosten</div>
                </div>
                <div>
                    <!-- Values -->
                    <div class="content-page-value">JS_INPUT</div>
                    <div class="content-page-value">JS_INPUT</div>
                    <div class="content-page-value">JS_INPUT</div>
                </div>

                <!-- Title -->
                <div>Sondereinzelkosten</div>
                <!-- Values -->
                <div class="content-page-value">JS_INPUT</div>

                <!-- Title -->
                <div>Herstellungskosten</div>
                <!-- Values -->
                <div class="content-page-value">JS_INPUT</div>

                <!-- Title -->
                <div>VVGK ( 5% v. HK )</div>
                <!-- Values -->
                <div class="content-page-value">JS_INPUT</div>

                <!-- Title -->
                <div>Selbstkosten</div>
                <!-- Values -->
                <div class="content-page-value">JS_INPUT</div>
                
            </div>
        </div>
    </div>
    
</template>

<script>
export default {

}
</script>

<style>
@media screen {
    .content{
        margin-top: 20px;
    } 

    .content-wrap{
        height: 100%;
        width: 75%;
        margin: auto;
        /* -webkit-box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.3);
        -moz-box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.3);
        box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.3); */
    }

    .total-title{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }

    .title-head{
        font-weight: bold;
    }
    
    .content-page{
        width: 80%;
        margin: auto;
        margin-top: 50px;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: 30px;
    }

    .content-page-value{
        text-align: center;
    }
}

@media print{
    .content{
        margin-top: 20px;
    } 

    .content-wrap{
        height: 100%;
        width: 75%;
        margin: auto;
        /* -webkit-box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.3);
        -moz-box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.3);
        box-shadow: 0px 0px 17px 0px rgba(0,0,0,0.3); */
    }

    .total-title{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
    }

    .title-head{
        font-weight: bold;
    }
    
    .content-page{
        width: 80%;
        margin: auto;
        margin-top: 50px;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-row-gap: 30px;
    }

    .content-page-value{
        text-align: center;
    }
}
</style>
