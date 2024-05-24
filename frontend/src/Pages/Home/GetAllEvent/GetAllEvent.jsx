import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Tag } from 'primereact/tag';
import { Paginator } from 'primereact/paginator';
import { classNames } from 'primereact/utils';
import { EventService } from '../../../service/EventService';
import { useNavigate } from 'react-router-dom';
import { format, isFuture, parse } from 'date-fns';
import './GetAllEvent.css';

const parseCustomDate = (dateString) => {
    return parse(dateString, 'dd/MM/yyyy HH:mm', new Date());
};
export default function GetAllEvent() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('list');
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(5);
    const [totalRecords, setTotalRecords] = useState(0);


    const navigate = useNavigate();

    useEffect(() => {
        EventService.getEvents().then(data => {
            const futureEvents = data.filter(event => isFuture(parseCustomDate(event.date)));
            const sortedEvents = futureEvents.sort((a, b) => {
                const dateA = parseCustomDate(a.date);
                const dateB = parseCustomDate(b.date);
                return dateA - dateB;
            });
            setProducts(sortedEvents);
            setTotalRecords(sortedEvents.length);
        });
    }, []);


    const getInventoryStatus = (stockage) => {
        if (stockage > 40) {
            return { label: 'Disponible', severity: 'success' };
        } else if (stockage <= 40 && stockage > 0) {
            return { label: `Encore ${stockage} places`, severity: 'warning' };
        } else {
            return { label: 'Complet', severity: 'danger' };
        }
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };
    const handleViewMore = (product) => {
        const urlTitle = product.name.replace(/\s+/g, "").trim();
        navigate(`/event/${urlTitle}`, { state: { productId: product.id, productCategory:product.category['id'] }});
    };



    const listItem = (product) => {
        const inventoryStatus = getInventoryStatus(product.stockage);
        const formattedDate = format(parseCustomDate(product.date), 'dd/MM/yy \'à\' HH\'h\'mm');
        return (
            <div className="col-12" style={{ padding: '0 10px' }}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4')}>
                    <img
                        className="w-9 sm:w-16rem xl:w-20rem shadow-2 block xl:block mx-auto border-round img-homepage-responsive"
                        src={`${process.env.REACT_APP_BASE_URL}/assets/${product.image}`}
                        alt={product.name}
                        style={{ height: '12rem' }}
                    />
                    <div
                        className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
                        style={{ height: '100%' }}
                    >
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3"
                             style={{height: '100%'}}>
                            <div className="text-2xl font-bold text-900" style={{height: '33%'}}>
                                {product.name}
                            </div>
                            <div className="text-md" style={{height: '33%'}}>
                                <i className="pi pi-calendar mr-1"></i>
                                {formattedDate}
                            </div>
                            <div className="flex align-items-center gap-3" style={{height: '33%'}}>
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-map-marker"></i>
                                    <span className="font-semibold">{product.location}</span>
                                </span>
                            </div>
                        </div>
                        <div className="listCOmponent-container-Home">
                            <div className='listComponent-Home'>
                                <div className="p-d-flex p-jc-between p-ai-center responsive-home-component"
                                     style={{display: 'flex', justifyContent: 'center', gridGap: '0.5rem'}}>
                                    <Tag value={`Single - ${product.price}€`} severity="secondary" icon="pi pi-user"/>
                                    <Tag value={`Duo (2) - ${product.PriceOffertDuo}€`} severity="secondary"
                                         icon="pi pi-users"/>
                                    <Tag value={`Familiales (4) - ${product.PriceOffertFamille}€`} severity="secondary"
                                         icon="pi pi-users"/>
                                </div>
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category['name']}</span>
                                </span>
                                <Tag value={inventoryStatus.label} severity={inventoryStatus.severity}/>
                            </div>
                            <Button icon="pi pi-shopping-cart btn-responsive-home-component" className="p-button-rounded p-button-info"
                                    onClick={() => handleViewMore(product)} disabled={product.stockage === 0}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        const inventoryStatus = getInventoryStatus(product.stockage);
        const formattedDate = format(parseCustomDate(product.date), 'dd/MM/yy \'à\' HH\'h\'mm');
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-3 p-2" key={product.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="gap-2 responsive-gridItem-home-container">
                        <div className="gap-2 responsive-gridItem-home">
                            <Tag value={`Single - ${product.price}€`} severity="secondary" icon="pi pi-user"/>
                            <Tag value={`Duo (2) - ${product.PriceOffertDuo}€`} severity="secondary"
                                 icon="pi pi-users"/>
                            <Tag value={`Familiales (4) - ${product.PriceOffertFamille}€`} severity="secondary"
                                 icon="pi pi-users"/>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img
                            className="w-9 shadow-2 border-round img-homepage-responsive"
                            src={`${process.env.REACT_APP_BASE_URL}/assets/${product.image}`}
                            alt={product.name}
                            style={{height: '12rem', width: '20rem'}}
                        />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <div className="text-md">
                            <i className="pi pi-calendar mr-1"></i>
                            {formattedDate}
                        </div>
                    </div>
                    <div className="flex container-btn-tag-home">
                        <div className="offer-container">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'start',
                                flexDirection: 'column',
                                gridGap: '0.5rem'
                            }}>
                                <Tag value={inventoryStatus.label} severity={inventoryStatus.severity}/>
                                <div>
                                    <i className="pi pi-map-marker mr-1"></i>
                                    <span className="font-semibold">{product.location}</span>
                                </div>
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category['name']}</span>
                                </span>
                            </div>
                        </div>
                        <div
                            style={{
                                flex: '2 1 50%',
                                display: 'flex',
                                justifyContent: 'right',
                                gridGap: '1rem',
                            }}
                        className='btn-grid-home'>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded p-button-info"
                                    onClick={() => handleViewMore(product)} disabled={product.stockage === 0}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        return layout === 'list' ? listItem(product) : gridItem(product);
    };

    const header = () => {
        return (
            <div className='container-header-fullPage-Home'>
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                <div className="p-text-center p-mb-4" style={{fontSize: '1.5rem', fontWeight: 'bold'}}>
                    Les événements Disponible en E-Billet
                </div>
            </div>
        );
    };


    const footer = () => {
        return <Paginator first={first} rows={rows} totalRecords={totalRecords} onPageChange={onPageChange} />;
    };

    return (
        <div className="p-grid p-15">
            <div className="p-col-12">
                <div className="card card-getAll">
                    <DataView
                        value={products.slice(first, first + rows)}
                        layout={layout}
                        itemTemplate={itemTemplate}
                        header={header()}
                        footer={footer()}
                    />
                </div>
            </div>
        </div>
    );
}
