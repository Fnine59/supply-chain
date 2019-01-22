# 后端相关配置

## 数据库建表语句

```sql
CREATE TABLE baseinfo_goods(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '物品id' ,
    unit_id INT    COMMENT '单位id' ,
    class_id INT    COMMENT '类别id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '物品名称' ,
    spec VARCHAR(128) NOT NULL   COMMENT '物品规格' ,
    unit_price DECIMAL(32,8) NOT NULL   COMMENT '物品单价' ,
    delete_flag VARCHAR(1) NOT NULL  DEFAULT false COMMENT '是否删除 tru -> 已删除; false -> 未删除' ,
    PRIMARY KEY (id)
) COMMENT = '物品表';/*SQL@Run*/
ALTER TABLE baseinfo_goods COMMENT '物品表';/*SQL@Run*/
CREATE TABLE baseinfo_unit(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '单位id' ,
    name VARCHAR(1024) NOT NULL   COMMENT '单位名称' ,
    PRIMARY KEY (id)
) COMMENT = '物品单位表 ';/*SQL@Run*/
ALTER TABLE baseinfo_unit COMMENT '物品单位表';/*SQL@Run*/
CREATE TABLE baseinfo_good_class(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '类别id' ,
    name VARCHAR(1024) NOT NULL   COMMENT '类别名称' ,
    PRIMARY KEY (id)
) COMMENT = '物品类别表 ';/*SQL@Run*/
ALTER TABLE baseinfo_good_class COMMENT '物品类别表';/*SQL@Run*/
CREATE TABLE baseinfo_store(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '门店id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '门店名称' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '门店状态 true->已启用;false->已停用' ,
    PRIMARY KEY (id)
) COMMENT = '门店信息表 ';/*SQL@Run*/
ALTER TABLE baseinfo_store COMMENT '门店信息表';/*SQL@Run*/
CREATE TABLE baseinfo_dispatch(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '配送中心id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '配送中心名称' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '使用状态 true->使用中;false->已停用' ,
    PRIMARY KEY (id)
) COMMENT = '配送中心（总部）表 ';/*SQL@Run*/
ALTER TABLE baseinfo_dispatch COMMENT '配送中心（总部）表';/*SQL@Run*/
CREATE TABLE baseinfo_supplier(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '供应商名称' ,
    type VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '经营类型 1->公;2->个人' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '启用状态 true->已启用;false->已停用' ,
    PRIMARY KEY (id)
) COMMENT = '供应商表 ';/*SQL@Run*/
ALTER TABLE baseinfo_supplier COMMENT '供应商表';/*SQL@Run*/
CREATE TABLE baseinfo_pr_relationship(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    dispatch_id INT NOT NULL   COMMENT '配送中心id' ,
    supplier_id INT NOT NULL   COMMENT '供应商id' ,
    goods_id INT NOT NULL   COMMENT '物品id' ,
    store_id INT NOT NULL   COMMENT '门店id' ,
    PRIMARY KEY (id)
) COMMENT = '采购关系表 ';/*SQL@Run*/
ALTER TABLE baseinfo_pr_relationship COMMENT '采购关系表';/*SQL@Run*/
CREATE TABLE baseinfo_user(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    user_name VARCHAR(3072) NOT NULL   COMMENT '用户名' ,
    password VARCHAR(3072) NOT NULL   COMMENT '密码' ,
    nickname VARCHAR(3072)    COMMENT '昵称' ,
    telephone VARCHAR(1024)    COMMENT '电话' ,
    PRIMARY KEY (id)
) COMMENT = '用户表 ';/*SQL@Run*/
ALTER TABLE baseinfo_user COMMENT '用户表';/*SQL@Run*/
CREATE TABLE store_goods_relations(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_id INT NOT NULL   COMMENT '采购单id' ,
    goods_id INT NOT NULL   COMMENT '物品id' ,
    supplier_id INT    COMMENT '供应商id' ,
    dispatch_id INT    COMMENT '配送中心id' ,
    goods_count DECIMAL(32,10) NOT NULL   COMMENT '采购物品数量' ,
    PRIMARY KEY (id)
) COMMENT = '门店物品采购关系表 ';/*SQL@Run*/
ALTER TABLE store_goods_relations COMMENT '门店物品采购关系表';/*SQL@Run*/
CREATE TABLE store_indepot_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '入库单号' ,
    type VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '入库类型 1->请购入库;2->自采入库' ,
    date DATE NOT NULL   COMMENT '入库日期' ,
    acceptance_order_id VARCHAR(32) NOT NULL   COMMENT '验收单id' ,
    PRIMARY KEY (id)
) COMMENT = '门店入库单表 ';/*SQL@Run*/
ALTER TABLE store_indepot_order COMMENT '门店入库单表';/*SQL@Run*/
CREATE TABLE store_purchase_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '采购单号' ,
    create_time DATETIME NOT NULL   COMMENT '采购日期' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '单据状态 1->待处理;2->已提交;3->已完成' ,
    arrive_date DATE    COMMENT '到货日期' ,
    amount DECIMAL(32,8) NOT NULL  DEFAULT 0.00 COMMENT '采购金额' ,
    store_id INT    COMMENT '门店id' ,
    type VARCHAR(128) NOT NULL   COMMENT '采购类型 1->门店请购;2->门店自采' ,
    update_time DATETIME NOT NULL   COMMENT '状态更新时间 每次单据状态更新时改变该字段为当前时间' ,
    PRIMARY KEY (id)
) COMMENT = '门店采购订单表 ';/*SQL@Run*/
ALTER TABLE store_purchase_order COMMENT '门店采购订单表';/*SQL@Run*/
CREATE TABLE store_acceptance_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    store_order_id INT    COMMENT '来源订单id' ,
    dispatch_order_id INT    COMMENT '关联配送单id' ,
    PRIMARY KEY (id)
) COMMENT = '门店验收单表 ';/*SQL@Run*/
ALTER TABLE store_acceptance_order COMMENT '门店验收单表';/*SQL@Run*/
CREATE TABLE hq_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    purchase_order_no VARCHAR(32) NOT NULL   COMMENT '请购单id' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '订单处理状态 1->待处理;2->已完成' ,
    disptach_order_id INT    COMMENT '总部配送单id' ,
    PRIMARY KEY (id)
) COMMENT = '总部订单表 ';/*SQL@Run*/
ALTER TABLE hq_order COMMENT '总部订单表';/*SQL@Run*/
CREATE TABLE dispatch_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_id VARCHAR(32) NOT NULL   COMMENT '总部订单id' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    dispatch_id INT NOT NULL   COMMENT '配送中心id' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '状态 1->待出库;2->已出库;' ,
    PRIMARY KEY (id)
) COMMENT = '总部配送订单表 ';/*SQL@Run*/
ALTER TABLE dispatch_order COMMENT '总部配送订单表';/*SQL@Run*/
CREATE TABLE supplier_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    self_purchase_order_no VARCHAR(32) NOT NULL   COMMENT '自采单id' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '订单处理状态 1->待处理;2->已完成' ,
    send_goods_order_id INT    COMMENT '发货单id' ,
    PRIMARY KEY (id)
) COMMENT = '供应商订单表 ';/*SQL@Run*/
ALTER TABLE supplier_order COMMENT '供应商订单表';/*SQL@Run*/
CREATE TABLE supplier_send_goods_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_id VARCHAR(32) NOT NULL   COMMENT '供应商订单id' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    dispatch_id INT NOT NULL   COMMENT '供应商id' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '状态 1->待出库;2->已出库;' ,
    PRIMARY KEY (id)
) COMMENT = '供应商发货单表 ';/*SQL@Run*/
ALTER TABLE supplier_send_goods_order COMMENT '供应商发货单表';/*SQL@Run*/
```

## 数据库重新建表语句（带有删表语句）

```sql
DROP TABLE baseinfo_goods;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_goods(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '物品id' ,
    unit_id INT    COMMENT '单位id' ,
    class_id INT    COMMENT '类别id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '物品名称' ,
    spec VARCHAR(128) NOT NULL   COMMENT '物品规格' ,
    unit_price DECIMAL(32,8) NOT NULL   COMMENT '物品单价' ,
    delete_flag VARCHAR(1) NOT NULL  DEFAULT false COMMENT '是否删除 tru -> 已删除; false -> 未删除' ,
    PRIMARY KEY (id)
) COMMENT = '物品表';/*SQL@Run*/
ALTER TABLE baseinfo_goods COMMENT '物品表';/*SQL@Run*/
DROP TABLE baseinfo_unit;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_unit(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '单位id' ,
    name VARCHAR(1024) NOT NULL   COMMENT '单位名称' ,
    PRIMARY KEY (id)
) COMMENT = '物品单位表 ';/*SQL@Run*/
ALTER TABLE baseinfo_unit COMMENT '物品单位表';/*SQL@Run*/
DROP TABLE baseinfo_good_class;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_good_class(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '类别id' ,
    name VARCHAR(1024) NOT NULL   COMMENT '类别名称' ,
    PRIMARY KEY (id)
) COMMENT = '物品类别表 ';/*SQL@Run*/
ALTER TABLE baseinfo_good_class COMMENT '物品类别表';/*SQL@Run*/
DROP TABLE baseinfo_store;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_store(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '门店id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '门店名称' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '门店状态 true->已启用;false->已停用' ,
    PRIMARY KEY (id)
) COMMENT = '门店信息表 ';/*SQL@Run*/
ALTER TABLE baseinfo_store COMMENT '门店信息表';/*SQL@Run*/
DROP TABLE baseinfo_dispatch;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_dispatch(
    id INT NOT NULL AUTO_INCREMENT  COMMENT '配送中心id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '配送中心名称' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '使用状态 true->使用中;false->已停用' ,
    PRIMARY KEY (id)
) COMMENT = '配送中心（总部）表 ';/*SQL@Run*/
ALTER TABLE baseinfo_dispatch COMMENT '配送中心（总部）表';/*SQL@Run*/
DROP TABLE baseinfo_supplier;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_supplier(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    name VARCHAR(3072) NOT NULL   COMMENT '供应商名称' ,
    type VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '经营类型 1->公;2->个人' ,
    status VARCHAR(1) NOT NULL  DEFAULT false COMMENT '启用状态 true->已启用;false->已停用' ,
    PRIMARY KEY (id)
) COMMENT = '供应商表 ';/*SQL@Run*/
ALTER TABLE baseinfo_supplier COMMENT '供应商表';/*SQL@Run*/
DROP TABLE baseinfo_pr_relationship;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_pr_relationship(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    dispatch_id INT NOT NULL   COMMENT '配送中心id' ,
    supplier_id INT NOT NULL   COMMENT '供应商id' ,
    goods_id INT NOT NULL   COMMENT '物品id' ,
    store_id INT NOT NULL   COMMENT '门店id' ,
    PRIMARY KEY (id)
) COMMENT = '采购关系表 ';/*SQL@Run*/
ALTER TABLE baseinfo_pr_relationship COMMENT '采购关系表';/*SQL@Run*/
DROP TABLE baseinfo_user;/*SQL@Run*//*SkipError*/
CREATE TABLE baseinfo_user(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    user_name VARCHAR(3072) NOT NULL   COMMENT '用户名' ,
    password VARCHAR(3072) NOT NULL   COMMENT '密码' ,
    nickname VARCHAR(3072)    COMMENT '昵称' ,
    telephone VARCHAR(1024)    COMMENT '电话' ,
    PRIMARY KEY (id)
) COMMENT = '用户表 ';/*SQL@Run*/
ALTER TABLE baseinfo_user COMMENT '用户表';/*SQL@Run*/
DROP TABLE store_goods_relations;/*SQL@Run*//*SkipError*/
CREATE TABLE store_goods_relations(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_id INT NOT NULL   COMMENT '采购单id' ,
    goods_id INT NOT NULL   COMMENT '物品id' ,
    supplier_id INT    COMMENT '供应商id' ,
    dispatch_id INT    COMMENT '配送中心id' ,
    goods_count DECIMAL(32,10) NOT NULL   COMMENT '采购物品数量' ,
    PRIMARY KEY (id)
) COMMENT = '门店物品采购关系表 ';/*SQL@Run*/
ALTER TABLE store_goods_relations COMMENT '门店物品采购关系表';/*SQL@Run*/
DROP TABLE store_indepot_order;/*SQL@Run*//*SkipError*/
CREATE TABLE store_indepot_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '入库单号' ,
    type VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '入库类型 1->请购入库;2->自采入库' ,
    date DATE NOT NULL   COMMENT '入库日期' ,
    acceptance_order_id VARCHAR(32) NOT NULL   COMMENT '验收单id' ,
    PRIMARY KEY (id)
) COMMENT = '门店入库单表 ';/*SQL@Run*/
ALTER TABLE store_indepot_order COMMENT '门店入库单表';/*SQL@Run*/
DROP TABLE store_purchase_order;/*SQL@Run*//*SkipError*/
CREATE TABLE store_purchase_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_no VARCHAR(32) NOT NULL   COMMENT '采购单号' ,
    create_time DATETIME NOT NULL   COMMENT '采购日期' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '单据状态 1->待处理;2->已提交;3->已完成' ,
    arrive_date DATE    COMMENT '到货日期' ,
    amount DECIMAL(32,8) NOT NULL  DEFAULT 0.00 COMMENT '采购金额' ,
    store_id INT    COMMENT '门店id' ,
    type VARCHAR(128) NOT NULL   COMMENT '采购类型 1->门店请购;2->门店自采' ,
    update_time DATETIME NOT NULL   COMMENT '状态更新时间 每次单据状态更新时改变该字段为当前时间' ,
    PRIMARY KEY (id)
) COMMENT = '门店采购订单表 ';/*SQL@Run*/
ALTER TABLE store_purchase_order COMMENT '门店采购订单表';/*SQL@Run*/
DROP TABLE store_acceptance_order;/*SQL@Run*//*SkipError*/
CREATE TABLE store_acceptance_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    store_order_id INT    COMMENT '来源订单id' ,
    dispatch_order_id INT    COMMENT '关联配送单id' ,
    PRIMARY KEY (id)
) COMMENT = '门店验收单表 ';/*SQL@Run*/
ALTER TABLE store_acceptance_order COMMENT '门店验收单表';/*SQL@Run*/
DROP TABLE hq_order;/*SQL@Run*//*SkipError*/
CREATE TABLE hq_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    purchase_order_no VARCHAR(32) NOT NULL   COMMENT '请购单id' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '订单处理状态 1->待处理;2->已完成' ,
    disptach_order_id INT    COMMENT '总部配送单id' ,
    PRIMARY KEY (id)
) COMMENT = '总部订单表 ';/*SQL@Run*/
ALTER TABLE hq_order COMMENT '总部订单表';/*SQL@Run*/
DROP TABLE dispatch_order;/*SQL@Run*//*SkipError*/
CREATE TABLE dispatch_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_id VARCHAR(32) NOT NULL   COMMENT '总部订单id' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    dispatch_id INT NOT NULL   COMMENT '配送中心id' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '状态 1->待出库;2->已出库;' ,
    PRIMARY KEY (id)
) COMMENT = '总部配送订单表 ';/*SQL@Run*/
ALTER TABLE dispatch_order COMMENT '总部配送订单表';/*SQL@Run*/
DROP TABLE supplier_order;/*SQL@Run*//*SkipError*/
CREATE TABLE supplier_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    self_purchase_order_no VARCHAR(32) NOT NULL   COMMENT '自采单id' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '订单处理状态 1->待处理;2->已完成' ,
    send_goods_order_id INT    COMMENT '发货单id' ,
    PRIMARY KEY (id)
) COMMENT = '供应商订单表 ';/*SQL@Run*/
ALTER TABLE supplier_order COMMENT '供应商订单表';/*SQL@Run*/
DROP TABLE supplier_send_goods_order;/*SQL@Run*//*SkipError*/
CREATE TABLE supplier_send_goods_order(
    id INT NOT NULL AUTO_INCREMENT  COMMENT 'id' ,
    order_id VARCHAR(32) NOT NULL   COMMENT '供应商订单id' ,
    create_time DATETIME NOT NULL   COMMENT '创建时间' ,
    dispatch_id INT NOT NULL   COMMENT '供应商id' ,
    status VARCHAR(128) NOT NULL  DEFAULT 1 COMMENT '状态 1->待出库;2->已出库;' ,
    PRIMARY KEY (id)
) COMMENT = '供应商发货单表 ';/*SQL@Run*/
ALTER TABLE supplier_send_goods_order COMMENT '供应商发货单表';/*SQL@Run*/
```